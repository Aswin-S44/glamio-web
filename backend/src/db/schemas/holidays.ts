import {
  bigint,
  date,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { shopOwners } from "./shop-owners";

export const holidays = mysqlTable("holidays", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  date: date("date").notNull(),

  shopId: bigint("shop_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => shopOwners.id),

  reason: varchar("reason", { length: 256 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
