// db/client.ts
import { eq } from "drizzle-orm";
import {
  drizzle,
  useLiveQuery,
  type ExpoSQLiteDatabase,
} from "drizzle-orm/expo-sqlite";
import { useMigrations as useMigrationsDrizzle } from "drizzle-orm/expo-sqlite/migrator";
import * as SQLite from "expo-sqlite";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as schema from "../db/schema";
import migrations from "../drizzle/migrations";

type DbContextValue = ExpoSQLiteDatabase;

const DbContext = createContext<DbContextValue | null>(null);

function MigrationsGate({ children }: { children: ReactNode }) {
  const db = useDb();
  const { success, error } = useMigrationsDrizzle(db, migrations);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (success && !seeded) {
      const seedData = async () => {
        try {
          // Check if data already exists
          const existingIngredients = await db
            .select()
            .from(schema.ingredientsTable)
            .limit(1);
          const existingMeasurements = await db
            .select()
            .from(schema.measurementTypesTable)
            .limit(1);

          // Seed ingredients if table is empty
          if (existingIngredients.length === 0) {
            await db.insert(schema.ingredientsTable).values([
              { name: "Yeast", unit: "g" },
              { name: "Sugar", unit: "g" },
            ]);
          }

          // Seed measurement types if table is empty
          if (existingMeasurements.length === 0) {
            await db.insert(schema.measurementTypesTable).values([
              { key: "ph", name: "pH", unit: "pH" },
              {
                key: "bubbles",
                name: "Bubbles",
                unit: "seconds/bubble",
              },
              { key: "temperature", name: "Temperature", unit: "°C" },
              { key: "weight", name: "Weight", unit: "g" },
            ]);
          }

          setSeeded(true);
        } catch (err) {
          console.error("Failed to seed data:", err);
          // Set seeded to true anyway to prevent blocking
          setSeeded(true);
        }
      };

      seedData();
    }
  }, [success, seeded, db]);

  if (error) return null; // TODO: swap for error message

  if (!success) return null; // TODO: swap for loading UI

  if (!seeded && success) return null; // Wait for seeding to complete

  return <>{children}</>;
}

export function DbProvider({ children }: { children: ReactNode }) {
  const db = useMemo(() => {
    const expo = SQLite.openDatabaseSync("db.db", {
      enableChangeListener: true,
    });
    return drizzle(expo);
  }, []);

  return (
    <DbContext.Provider value={db}>
      <MigrationsGate>{children}</MigrationsGate>
    </DbContext.Provider>
  );
}

export function useDb(): DbContextValue {
  const ctx = useContext(DbContext);
  if (!ctx) throw new Error("useDb must be used within a DbProvider");
  return ctx;
}

/* =========================
   READ HOOKS (live queries)
   ========================= */

export function useBatches() {
  const db = useDb();
  const { data } = useLiveQuery(db.select().from(schema.batchesTable));
  return data ?? [];
}

export function useBatch(id: number) {
  const db = useDb();
  const { data } = useLiveQuery(
    db.select().from(schema.batchesTable).where(eq(schema.batchesTable.id, id))
  );
  return (data ?? [])[0] ?? null;
}

export function useLogEntries(batchId: number) {
  const db = useDb();

  const logEntriesResult = useLiveQuery(
    db
      .select()
      .from(schema.logEntriesTable)
      .where(eq(schema.logEntriesTable.batchId, batchId))
  );

  return logEntriesResult.data ?? [];
}

export function useIngredients() {
  const db = useDb();
  const { data } = useLiveQuery(db.select().from(schema.ingredientsTable));
  return data ?? [];
}

export function useMeasurementTypes() {
  const db = useDb();
  const { data } = useLiveQuery(db.select().from(schema.measurementTypesTable));
  return data ?? [];
}

export function useLogEntryIngredients(logEntryId: number) {
  const db = useDb();
  const { data } = useLiveQuery(
    db
      .select()
      .from(schema.logEntryIngredientsTable)
      .where(eq(schema.logEntryIngredientsTable.logEntryId, logEntryId))
  );
  return data ?? [];
}

export function useLogEntryMeasurements(logEntryId: number) {
  const db = useDb();
  const { data } = useLiveQuery(
    db
      .select()
      .from(schema.logEntryMeasurementsTable)
      .where(eq(schema.logEntryMeasurementsTable.logEntryId, logEntryId))
  );
  return data ?? [];
}

/* =========================
   WRITE HELPERS (mutations)
   ========================= */

// Batches
export function useInsertBatch() {
  const db = useDb();
  return async (values: typeof schema.batchesTable.$inferInsert) => {
    await db.insert(schema.batchesTable).values(values);
  };
}
export function useDeleteBatch() {
  const db = useDb();
  return async (id: number) => {
    await db.delete(schema.batchesTable).where(eq(schema.batchesTable.id, id));
  };
}

export function useInsertLogEntry() {
  const db = useDb();
  return async (values: {
    entry: typeof schema.logEntriesTable.$inferInsert;
    ingredients?: Omit<
      typeof schema.logEntryIngredientsTable.$inferInsert,
      "logEntryId"
    >[];
    measurements?: Omit<
      typeof schema.logEntryMeasurementsTable.$inferInsert,
      "logEntryId"
    >[];
  }) => {
    await db.transaction(async (tx) => {
      const result = await tx
        .insert(schema.logEntriesTable)
        .values(values.entry)
        .returning({ id: schema.logEntriesTable.id });

      const insertedEntry = result[0];
      if (!insertedEntry) {
        throw new Error("Failed to insert log entry: no ID returned");
      }

      const logEntryId = insertedEntry.id;

      if (values.ingredients && values.ingredients.length > 0) {
        for (const ingredient of values.ingredients) {
          if (ingredient.amount <= 0) {
            throw new Error("Amount must be > 0");
          }
          await tx.insert(schema.logEntryIngredientsTable).values({
            ...ingredient,
            logEntryId,
          });
        }
      }

      if (values.measurements && values.measurements.length > 0) {
        for (const measurement of values.measurements) {
          try {
            await tx.insert(schema.logEntryMeasurementsTable).values({
              ...measurement,
              logEntryId,
            });
          } catch (e: any) {
            if (String(e?.message ?? "").includes("uniq_lem_entry_type")) {
              throw new Error(
                "This log entry already has a value for that measurement type."
              );
            }
            throw e;
          }
        }
      }
    });
  };
}
export function useDeleteLogEntry() {
  const db = useDb();
  return async (id: number) => {
    await db
      .delete(schema.logEntriesTable)
      .where(eq(schema.logEntriesTable.id, id));
  };
}

export function useAddIngredientLine() {
  const db = useDb();
  return async (
    values: typeof schema.logEntryIngredientsTable.$inferInsert
  ) => {
    // amount > 0 is enforced by CHECK; better to validate early too:
    if (values.amount <= 0) throw new Error("Amount must be > 0");
    await db.insert(schema.logEntryIngredientsTable).values(values);
  };
}
export function useDeleteIngredientLine() {
  const db = useDb();
  return async (id: number) => {
    await db
      .delete(schema.logEntryIngredientsTable)
      .where(eq(schema.logEntryIngredientsTable.id, id));
  };
}

export function useAddMeasurement() {
  const db = useDb();
  return async (
    values: typeof schema.logEntryMeasurementsTable.$inferInsert
  ) => {
    // UNIQUE (logEntryId, measurementTypeId) enforced at DB; soft-guard for nicer errors:
    try {
      await db.insert(schema.logEntryMeasurementsTable).values(values);
    } catch (e: any) {
      if (String(e?.message ?? "").includes("uniq_lem_entry_type")) {
        throw new Error(
          "This log entry already has a value for that measurement type."
        );
      }
      throw e;
    }
  };
}
export function useDeleteMeasurement() {
  const db = useDb();
  return async (id: number) => {
    await db
      .delete(schema.logEntryMeasurementsTable)
      .where(eq(schema.logEntryMeasurementsTable.id, id));
  };
}

export function useInsertIngredient() {
  const db = useDb();
  return async (values: typeof schema.ingredientsTable.$inferInsert) => {
    await db.insert(schema.ingredientsTable).values(values);
  };
}
export function useInsertMeasurementType() {
  const db = useDb();
  return async (values: typeof schema.measurementTypesTable.$inferInsert) => {
    await db.insert(schema.measurementTypesTable).values(values);
  };
}

export const useRefinedIngredients = (ingredients: LogEntryIngredient[]) => {
  const ingredientsOptions = useIngredients();
  const usedIngredients = ingredientsOptions.filter((option) =>
    ingredients.some((ingredient) => ingredient.ingredientId === option.id)
  );

  return ingredients.map((ingredient) => {
    const option = usedIngredients.find(
      (option) => option.id === ingredient.ingredientId
    );

    return {
      ...ingredient,
      name: option!.name,
      unit: option!.unit,
    };
  });
};

export const useRefinedMeasurements = (measurements: LogEntryMeasurement[]) => {
  const measurementTypesOptions = useMeasurementTypes();
  const usedMeasurementTypes = measurementTypesOptions.filter((option) =>
    measurements.some(
      (measurement) => measurement.measurementTypeId === option.id
    )
  );
  return measurements.map((measurement) => {
    const option = usedMeasurementTypes.find(
      (option) => option.id === measurement.measurementTypeId
    );
    return {
      ...measurement,
      name: option!.name,
      unit: option!.unit,
    };
  });
};

export type Batch = typeof schema.batchesTable.$inferSelect;
export type LogEntry = typeof schema.logEntriesTable.$inferSelect;
export type Ingredient = typeof schema.ingredientsTable.$inferSelect;
export type MeasurementType = typeof schema.measurementTypesTable.$inferSelect;
export type LogEntryIngredient =
  typeof schema.logEntryIngredientsTable.$inferSelect;
export type LogEntryMeasurement =
  typeof schema.logEntryMeasurementsTable.$inferSelect;
export type LogEntryWithRelations = LogEntry & {
  ingredients: LogEntryIngredient[];
  measurements: LogEntryMeasurement[];
};
