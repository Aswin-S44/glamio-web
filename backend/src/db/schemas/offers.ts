import { bigint, mysqlTable, timestamp, int } from "drizzle-orm/mysql-core";

import { shopOwners } from "./shop-owners";
import { category } from "./category";
import { services } from "./services";

export const offers = mysqlTable("offers", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  categoryId: bigint("category_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => category.id),

  offerPrice: int("offer_price").notNull(),
  regularPrice: int("regular_price").notNull(),

  serviceId: bigint("service_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => services.id),

  shopId: bigint("shop_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => shopOwners.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

