import {
  bigint,
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { shopOwners } from "./shop-owners";
import { users } from "./users";
import { notificationTypes } from "./notification-types";

export const notifications = mysqlTable("notifications", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  notificationTypeId: int("notification_type_id")
    .notNull()
    .references(() => notificationTypes.id),
  fromId: int("from_id")
    .notNull()
    .references(() => users.id),
  toId: int("to_id")
    .notNull()
    .references(() => users.id),
  message: varchar("message", { length: 500 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  shopId: int("shop_id")
    .notNull()
    .references(() => shopOwners.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
