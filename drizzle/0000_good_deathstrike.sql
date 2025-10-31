CREATE TABLE `batches_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`image` text,
	`archived` integer DEFAULT false NOT NULL,
	`finalVolume` real,
	`initialVolume` real NOT NULL,
	`volumeUnit` text DEFAULT 'L' NOT NULL,
	`rating` integer,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "rating_range" CHECK("batches_table"."rating" IS NULL OR ("batches_table"."rating" BETWEEN 1 AND 5)),
	CONSTRAINT "initial_volume_pos" CHECK("batches_table"."initialVolume" > 0)
);
--> statement-breakpoint
CREATE TABLE `ingredients_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ingredients_table_name_unique` ON `ingredients_table` (`name`);--> statement-breakpoint
CREATE TABLE `log_entries_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`batchId` integer NOT NULL,
	`occurredAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`notes` text,
	FOREIGN KEY (`batchId`) REFERENCES `batches_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_log_entries_batch` ON `log_entries_table` (`batchId`);--> statement-breakpoint
CREATE TABLE `log_entry_ingredients_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`logEntryId` integer NOT NULL,
	`ingredientId` integer NOT NULL,
	`amount` real NOT NULL,
	FOREIGN KEY (`logEntryId`) REFERENCES `log_entries_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients_table`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "lei_amount_pos" CHECK("log_entry_ingredients_table"."amount" > 0)
);
--> statement-breakpoint
CREATE INDEX `idx_lei_entry` ON `log_entry_ingredients_table` (`logEntryId`);--> statement-breakpoint
CREATE INDEX `idx_lei_ing` ON `log_entry_ingredients_table` (`ingredientId`);--> statement-breakpoint
CREATE TABLE `log_entry_measurements_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`logEntryId` integer NOT NULL,
	`measurementTypeId` integer NOT NULL,
	`value` real NOT NULL,
	FOREIGN KEY (`logEntryId`) REFERENCES `log_entries_table`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`measurementTypeId`) REFERENCES `measurement_types_table`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `idx_lem_entry` ON `log_entry_measurements_table` (`logEntryId`);--> statement-breakpoint
CREATE INDEX `idx_lem_type` ON `log_entry_measurements_table` (`measurementTypeId`);--> statement-breakpoint
CREATE UNIQUE INDEX `uniq_lem_entry_type` ON `log_entry_measurements_table` (`logEntryId`,`measurementTypeId`);--> statement-breakpoint
CREATE TABLE `measurement_types_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`defaultUnit` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `measurement_types_table_key_unique` ON `measurement_types_table` (`key`);