CREATE TABLE `appointment_status` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `appointment_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `appointments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`status_id` int NOT NULL,
	`confirmed_at` date NOT NULL,
	`customer_id` int NOT NULL,
	`expert_id` int NOT NULL,
	`slot_id` int NOT NULL,
	`shop_id` int NOT NULL,
	`rate` int NOT NULL DEFAULT 0,
	`service_ids` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`shop_id` bigint unsigned NOT NULL,
	`name` varchar(100) NOT NULL,
	`about` varchar(500),
	`address` varchar(500),
	`image` varchar(256),
	`specialist` json NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `experts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `holidays` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`date` date NOT NULL,
	`shop_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `holidays_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `notification_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`notification_type_id` int NOT NULL,
	`from_id` int NOT NULL,
	`to_id` int NOT NULL,
	`message` varchar(500) NOT NULL,
	`is_read` boolean NOT NULL DEFAULT false,
	`shop_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`category_id` int NOT NULL,
	`offer_price` int NOT NULL,
	`regular_price` int NOT NULL,
	`service_id` int NOT NULL,
	`shop_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`image_url` varchar(256) NOT NULL,
	`rate` int NOT NULL DEFAULT 0,
	`shop_id` int NOT NULL,
	`category_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_image_url_unique` UNIQUE(`image_url`)
);
--> statement-breakpoint
CREATE TABLE `shop_owners` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` bigint unsigned NOT NULL,
	`about` varchar(256) NOT NULL,
	`address` varchar(500) NOT NULL,
	`latitude` decimal(10,7) NOT NULL,
	`longitude` decimal(10,7) NOT NULL,
	`google_review_url` varchar(500),
	`is_onboarded` boolean NOT NULL DEFAULT false,
	`opening_hours` json NOT NULL,
	`parlour_name` varchar(256) NOT NULL,
	`place_id` varchar(100),
	`total_rating` int NOT NULL DEFAULT 0,
	CONSTRAINT `shop_owners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `slots` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`shop_id` bigint unsigned NOT NULL,
	`slot_date` date NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`max_capacity` int NOT NULL,
	`booked_count` int NOT NULL DEFAULT 0,
	`is_available` boolean NOT NULL DEFAULT true,
	`is_recurring` boolean NOT NULL DEFAULT false,
	`contact_phone` varchar(15),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `slots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `user_types_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_user_types_name` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`username` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`phone` varchar(15),
	`is_active` boolean NOT NULL DEFAULT false,
	`email_verified` boolean NOT NULL DEFAULT false,
	`fcm_token` varchar(256),
	`profile_image` varchar(256),
	`user_type_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_status_id_appointment_status_id_fk` FOREIGN KEY (`status_id`) REFERENCES `appointment_status`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_customer_id_users_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_expert_id_experts_id_fk` FOREIGN KEY (`expert_id`) REFERENCES `experts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_slot_id_slots_id_fk` FOREIGN KEY (`slot_id`) REFERENCES `slots`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `experts` ADD CONSTRAINT `experts_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `holidays` ADD CONSTRAINT `holidays_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_notification_type_id_notification_types_id_fk` FOREIGN KEY (`notification_type_id`) REFERENCES `notification_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_from_id_users_id_fk` FOREIGN KEY (`from_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_to_id_users_id_fk` FOREIGN KEY (`to_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offers` ADD CONSTRAINT `offers_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offers` ADD CONSTRAINT `offers_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offers` ADD CONSTRAINT `offers_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `services` ADD CONSTRAINT `services_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `services` ADD CONSTRAINT `services_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shop_owners` ADD CONSTRAINT `shop_owners_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `slots` ADD CONSTRAINT `slots_shop_id_shop_owners_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shop_owners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_user_type_id_user_types_id_fk` FOREIGN KEY (`user_type_id`) REFERENCES `user_types`(`id`) ON DELETE no action ON UPDATE no action;