ALTER TABLE `measurement_types_table` RENAME COLUMN "defaultUnit" TO "unit";--> statement-breakpoint
ALTER TABLE `batches_table` DROP COLUMN `volumeUnit`;