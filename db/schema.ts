import { sql } from "drizzle-orm";
import {
  check,
  index,
  int,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

/** INGREDIENTS (catalog) */
export const ingredientsTable = sqliteTable("ingredients_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  unit: text().notNull(), // e.g. "g", "ml"
});

/** MEASUREMENT TYPES (catalog) */
export const measurementTypesTable = sqliteTable("measurement_types_table", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull().unique(), // e.g. "temp", "ph", "sg"
  name: text().notNull(), // display name
  unit: text().notNull(), // "°C", "pH", ""
});

/** BATCHES */
export const batchesTable = sqliteTable(
  "batches_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text(),
    image: text(),
    archived: int({ mode: "boolean" }).notNull().default(false),
    finalVolume: real(),
    initialVolume: real().notNull(),
    rating: int(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    abv: real().notNull().default(0),
  },
  (t) => [
    check(
      "rating_range",
      sql`${t.rating} IS NULL OR (${t.rating} BETWEEN 1 AND 5)`
    ),
    check("initial_volume_pos", sql`${t.initialVolume} > 0`),
    check("abv_range", sql`(${t.abv} BETWEEN 0 AND 100)`),
  ]
);

/** LOG ENTRIES (one-to-many under batch) */
export const logEntriesTable = sqliteTable(
  "log_entries_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    batchId: int()
      .notNull()
      .references(() => batchesTable.id, { onDelete: "cascade" }),
    occurredAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    notes: text(),
  },
  (t) => [index("idx_log_entries_batch").on(t.batchId)]
);

/** INGREDIENT LINES per log entry (with amount) */
export const logEntryIngredientsTable = sqliteTable(
  "log_entry_ingredients_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    logEntryId: int()
      .notNull()
      .references(() => logEntriesTable.id, { onDelete: "cascade" }),
    ingredientId: int()
      .notNull()
      .references(() => ingredientsTable.id, { onDelete: "restrict" }),
    amount: real().notNull(), // number added at this entry
  },
  (t) => [
    index("idx_lei_entry").on(t.logEntryId),
    index("idx_lei_ing").on(t.ingredientId),
    check("lei_amount_pos", sql`${t.amount} > 0`),
  ]
);

/** MEASUREMENT VALUES per log entry */
export const logEntryMeasurementsTable = sqliteTable(
  "log_entry_measurements_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    logEntryId: int()
      .notNull()
      .references(() => logEntriesTable.id, { onDelete: "cascade" }),
    measurementTypeId: int()
      .notNull()
      .references(() => measurementTypesTable.id, { onDelete: "restrict" }),
    value: real().notNull(),
  },
  (t) => [
    index("idx_lem_entry").on(t.logEntryId),
    index("idx_lem_type").on(t.measurementTypeId),
    uniqueIndex("uniq_lem_entry_type").on(t.logEntryId, t.measurementTypeId),
  ]
);
