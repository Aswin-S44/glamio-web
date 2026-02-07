ALTER TABLE `services` ADD `description` varchar(256);--> statement-breakpoint
ALTER TABLE `services` ADD `duration` varchar(256) DEFAULT '60' NOT NULL;