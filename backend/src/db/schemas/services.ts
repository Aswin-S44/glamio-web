import {
  bigint,
  int,
  longtext,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { shopOwners } from "./shop-owners";
import { category } from "./category";

export const services = mysqlTable("services", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  name: varchar("name", { length: 256 }).notNull(),

  imageUrl: longtext("image_url").notNull(),

  rate: int("rate").notNull().default(0),

  shopId: bigint("shop_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => shopOwners.id),

  categoryId: bigint("category_id", {
    mode: "number",
    unsigned: true,
  }).references(() => category.id),

  description: longtext("description"),

  duration: varchar("duration", { length: 256 }).notNull().default("60"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
