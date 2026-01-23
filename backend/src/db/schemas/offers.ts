import { bigint, int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

import { shopOwners } from "./shop-owners";
import { category } from "./category";
import { services } from "./services";

export const offers = mysqlTable("offers", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  categoryId: int("category_id")
    .notNull()
    .references(() => category.id),
  offerPrice: int("offer_price").notNull(),
  regularPrice: int("regular_price").notNull(),
  serviceId: int("service_id")
    .notNull()
    .references(() => services.id),
  shopId: int("shop_id")
    .notNull()
    .references(() => shopOwners.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
