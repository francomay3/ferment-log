// db/client.ts
import { eq } from "drizzle-orm";
import {
  drizzle,
  useLiveQuery,
  type ExpoSQLiteDatabase,
} from "drizzle-orm/expo-sqlite";
import { useMigrations as useMigrationsDrizzle } from "drizzle-orm/expo-sqlite/migrator";
import * as SQLite from "expo-sqlite";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import * as schema from "../db/schema";
import migrations from "../drizzle/migrations";

type DbContextValue = ExpoSQLiteDatabase;

const DbContext = createContext<DbContextValue | null>(null);

function MigrationsGate({ children }: { children: ReactNode }) {
  const db = useDb();
  const { success, error } = useMigrationsDrizzle(db, migrations);

  if (error) return null;     // TODO: swap for error message

  if (!success) return null;  // TODO: swap for loading UI

  return <>{children}</>;
}

export function DbProvider({ children }: { children: ReactNode }) {
  const db = useMemo(() => {
    const expo = SQLite.openDatabaseSync("db.db", { enableChangeListener: true });
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

// All batches
export function useBatches() {
  const db = useDb();
  const { data } = useLiveQuery(db.select().from(schema.batchesTable));
  return data ?? [];
}

// Single batch (by id)
export function useBatch(id: number | null | undefined) {
  const db = useDb();
  const { data } = useLiveQuery(
    id == null
      ? db.select().from(schema.batchesTable).where(eq(schema.batchesTable.id, -1)) // empty
      : db.select().from(schema.batchesTable).where(eq(schema.batchesTable.id, id))
  );
  return (data ?? [])[0] ?? null;
}

// Log entries for a batch
export function useLogEntries(batchId: number | null | undefined) {
  const db = useDb();
  const { data } = useLiveQuery(
    batchId == null
      ? db.select().from(schema.logEntriesTable).where(eq(schema.logEntriesTable.batchId, -1))
      : db.select().from(schema.logEntriesTable).where(eq(schema.logEntriesTable.batchId, batchId))
  );
  return data ?? [];
}

// Ingredients catalog
export function useIngredients() {
  const db = useDb();
  const { data } = useLiveQuery(db.select().from(schema.ingredientsTable));
  return data ?? [];
}

// Measurement types catalog
export function useMeasurementTypes() {
  const db = useDb();
  const { data } = useLiveQuery(db.select().from(schema.measurementTypesTable));
  return data ?? [];
}

// Lines (ingredients) for a log entry
export function useLogEntryIngredients(logEntryId: number | null | undefined) {
  const db = useDb();
  const { data } = useLiveQuery(
    logEntryId == null
      ? db.select().from(schema.logEntryIngredientsTable).where(eq(schema.logEntryIngredientsTable.logEntryId, -1))
      : db.select().from(schema.logEntryIngredientsTable).where(eq(schema.logEntryIngredientsTable.logEntryId, logEntryId))
  );
  return data ?? [];
}

// Measurements for a log entry
export function useLogEntryMeasurements(logEntryId: number | null | undefined) {
  const db = useDb();
  const { data } = useLiveQuery(
    logEntryId == null
      ? db.select().from(schema.logEntryMeasurementsTable).where(eq(schema.logEntryMeasurementsTable.logEntryId, -1))
      : db.select().from(schema.logEntryMeasurementsTable).where(eq(schema.logEntryMeasurementsTable.logEntryId, logEntryId))
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

// Log entries
export function useInsertLogEntry() {
  const db = useDb();
  return async (values: typeof schema.logEntriesTable.$inferInsert) => {
    await db.insert(schema.logEntriesTable).values(values);
  };
}
export function useDeleteLogEntry() {
  const db = useDb();
  return async (id: number) => {
    await db.delete(schema.logEntriesTable).where(eq(schema.logEntriesTable.id, id));
  };
}

// Ingredient lines (per log entry)
export function useAddIngredientLine() {
  const db = useDb();
  return async (values: typeof schema.logEntryIngredientsTable.$inferInsert) => {
    // amount > 0 is enforced by CHECK; better to validate early too:
    if (values.amount <= 0) throw new Error("Amount must be > 0");
    await db.insert(schema.logEntryIngredientsTable).values(values);
  };
}
export function useDeleteIngredientLine() {
  const db = useDb();
  return async (id: number) => {
    await db.delete(schema.logEntryIngredientsTable).where(eq(schema.logEntryIngredientsTable.id, id));
  };
}

// Measurements (per log entry)
export function useAddMeasurement() {
  const db = useDb();
  return async (values: typeof schema.logEntryMeasurementsTable.$inferInsert) => {
    // UNIQUE (logEntryId, measurementTypeId) enforced at DB; soft-guard for nicer errors:
    try {
      await db.insert(schema.logEntryMeasurementsTable).values(values);
    } catch (e: any) {
      if (String(e?.message ?? "").includes("uniq_lem_entry_type")) {
        throw new Error("This log entry already has a value for that measurement type.");
      }
      throw e;
    }
  };
}
export function useDeleteMeasurement() {
  const db = useDb();
  return async (id: number) => {
    await db.delete(schema.logEntryMeasurementsTable).where(eq(schema.logEntryMeasurementsTable.id, id));
  };
}

// Catalog writes (optional; keep if you manage catalogs in-app)
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
