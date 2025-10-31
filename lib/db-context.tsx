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

  if (error) {
    return null; // or render an error UI
  }
  if (!success) {
    return null; // or render a loading UI
  }
  return <>{children}</>;
}

export function DbProvider({ children }: { children: ReactNode }) {
  const db = useMemo(() => {
    const expo = SQLite.openDatabaseSync("db.db", {enableChangeListener: true});
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
  if (!ctx) {
    throw new Error("useDb must be used within a DbProvider");
  }
  return ctx;
}

export function useUsers() {
  const db = useDb();
  const { data, error, updatedAt } = useLiveQuery(db.select().from(schema.usersTable));
  return data;
}

export function useInsertUser() {
  const db = useDb();
  return async (user: typeof schema.usersTable.$inferInsert) => {
    await db.insert(schema.usersTable).values(user);
  };
}

export function useDeleteUser() {
  const db = useDb();
  return async (id: number) => {
    await db.delete(schema.usersTable).where(eq(schema.usersTable.id, id));
  };
}