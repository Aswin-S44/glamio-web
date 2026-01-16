import {
  bigint,
  date,
  int,
  mysqlTable,
  timestamp,
} from "drizzle-orm/mysql-core";

import { shopOwners } from "./shop-owners";

export const holidays = mysqlTable("holidays", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  date: date("date").notNull(),
  shopId: int("shop_id")
    .notNull()
    .references(() => shopOwners.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
