PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_batches_table` (
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
	`abv` real,
	CONSTRAINT "rating_range" CHECK("__new_batches_table"."rating" IS NULL OR ("__new_batches_table"."rating" BETWEEN 1 AND 5)),
	CONSTRAINT "initial_volume_pos" CHECK("__new_batches_table"."initialVolume" > 0),
	CONSTRAINT "abv_range" CHECK("__new_batches_table"."abv" IS NULL OR ("__new_batches_table"."abv" BETWEEN 0 AND 100))
);
--> statement-breakpoint
INSERT INTO `__new_batches_table`("id", "name", "description", "image", "archived", "finalVolume", "initialVolume", "volumeUnit", "rating", "createdAt", "abv") SELECT "id", "name", "description", "image", "archived", "finalVolume", "initialVolume", "volumeUnit", "rating", "createdAt", "abv" FROM `batches_table`;--> statement-breakpoint
DROP TABLE `batches_table`;--> statement-breakpoint
ALTER TABLE `__new_batches_table` RENAME TO `batches_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;