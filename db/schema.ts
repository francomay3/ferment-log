import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

// // lib/database/schema.ts
// import { InferInsertModel, InferSelectModel } from "drizzle-orm";
// import { integer, primaryKey, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

// export const ingredient = sqliteTable("ingredient", {
//   id: integer("id").primaryKey(),
//   name: text("name").notNull(),
//   unit: text("unit"),
//   description: text("description"),
// }, (t) => ({
//   nameIdx: uniqueIndex("ux_ingredient_name").on(t.name),
// }));

// export const measurementType = sqliteTable("measurement_type", {
//   id: integer("id").primaryKey(),
//   name: text("name").notNull(),
//   canonicalUnit: text("canonical_unit").notNull(),
//   decimals: integer("decimals"),
//   minValue: real("min_value"),
//   maxValue: real("max_value"),
//   higherIsBetter: integer("higher_is_better", { mode: "boolean" }),
//   isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
// }, (t) => ({
//   nameIdx: uniqueIndex("ux_measurement_type_name").on(t.name),
// }));

// export const batch = sqliteTable("batch", {
//   id: integer("id").primaryKey(),
//   name: text("name").notNull(),
//   startedAt: text("started_at"),
//   status: text("status"),
//   description: text("description"),
//   image: text("image"),
//   archived: integer("archived", { mode: "boolean" }).notNull().default(false),
//   abv: real("abv"),
//   volume: real("volume"),
//   rating: real("rating"),
//   initialVolume: real("initial_volume"),
//   createdAt: text("created_at").notNull().default("datetime('now')"),
// });

// export const logEntry = sqliteTable("log_entry", {
//   id: integer("id").primaryKey(),
//   batchId: integer("batch_id").notNull().references(() => batch.id, { onDelete: "cascade" }),
//   entryAt: text("entry_at").notNull(),
//   stage: text("stage"),
//   notes: text("notes"),
// });

// export const logEntryIngredient = sqliteTable("log_entry_ingredient", {
//   logEntryId: integer("log_entry_id").notNull().references(() => logEntry.id, { onDelete: "cascade" }),
//   lineNo: integer("line_no").notNull(),
//   ingredientId: integer("ingredient_id").notNull().references(() => ingredient.id),
//   quantity: real("quantity").notNull(),
//   unit: text("unit"),
//   lineNote: text("line_note"),
// }, (t) => ({
//   pk: primaryKey({ columns: [t.logEntryId, t.lineNo] }),
// }));

// export const logEntryMeasurement = sqliteTable("log_entry_measurement", {
//   id: integer("id").primaryKey(),
//   logEntryId: integer("log_entry_id").notNull().references(() => logEntry.id, { onDelete: "cascade" }),
//   measurementTypeId: integer("measurement_type_id").notNull().references(() => measurementType.id),
//   value: real("value").notNull(),
//   unit: text("unit").notNull(),
//   measuredAt: text("measured_at"),
//   mNote: text("note"),
// });

// // Tipos inferidos
// export type Ingredient = InferSelectModel<typeof ingredient>;
// export type NewIngredient = InferInsertModel<typeof ingredient>;
// export type MeasurementType = InferSelectModel<typeof measurementType>;
// export type NewMeasurementType = InferInsertModel<typeof measurementType>;
// export type Batch = InferSelectModel<typeof batch>;
// export type NewBatch = InferInsertModel<typeof batch>;
// export type LogEntry = InferSelectModel<typeof logEntry>;
// export type NewLogEntry = InferInsertModel<typeof logEntry>;
// export type LogEntryIng = InferSelectModel<typeof logEntryIngredient>;
// export type NewLogEntryIng = InferInsertModel<typeof logEntryIngredient>;
// export type LogEntryMeas = InferSelectModel<typeof logEntryMeasurement>;
// export type NewLogEntryMeas = InferInsertModel<typeof logEntryMeasurement>;

