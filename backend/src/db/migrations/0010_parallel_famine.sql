CREATE TABLE `shop_statistics` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`shop_id` bigint unsigned NOT NULL,
	`stat_date` date NOT NULL,
	`daily_revenue` decimal(12,2) NOT NULL DEFAULT '0.00',
	`appointments_count` int NOT NULL DEFAULT 0,
	`unique_customers_count` int NOT NULL DEFAULT 0,
	`total_accumulated_revenue` decimal(15,2) NOT NULL DEFAULT '0.00',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shop_statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `shop_statistics` ADD CONSTRAINT `shop_statistics_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;