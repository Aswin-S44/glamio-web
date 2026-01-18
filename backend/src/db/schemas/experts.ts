import {
  bigint,
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
  json,
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
  about: varchar("about", { length: 500 }),
  address: varchar("address", { length: 500 }),
  image: varchar("image", { length: 256 }),

  specialist: json("specialist").notNull(),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
 