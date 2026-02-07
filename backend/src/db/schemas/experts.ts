import {
  bigint,
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
  json,
  longtext,
} from "drizzle-orm/mysql-core";
import { shopOwners } from "./shop-owners";

export const experts = mysqlTable("experts", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  shopId: bigint("shop_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => shopOwners.id),

  name: varchar("name", { length: 100 }).notNull(),
  about: longtext("about"),
  address: varchar("address", { length: 500 }),
  image: longtext("image"),

  specialist: varchar("specialist", { length: 100 }).notNull(),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
