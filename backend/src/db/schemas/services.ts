import {
  bigint,
  int,
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
  imageUrl: varchar("image_url", { length: 256 }).notNull().unique(),
  rate: int("rate").notNull().default(0),
  shopId: int("shop_id")
    .notNull()
    .references(() => shopOwners.id),
  categoryId: int("category_id")
    .notNull()
    .references(() => category.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
