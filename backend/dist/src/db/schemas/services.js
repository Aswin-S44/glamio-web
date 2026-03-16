"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const shop_owners_1 = require("./shop-owners");
const category_1 = require("./category");
exports.services = (0, mysql_core_1.mysqlTable)("services", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 256 }).notNull(),
    imageUrl: (0, mysql_core_1.longtext)("image_url").notNull(),
    rate: (0, mysql_core_1.int)("rate").notNull().default(0),
    shopId: (0, mysql_core_1.bigint)("shop_id", {
        mode: "number",
        unsigned: true,
    })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    categoryId: (0, mysql_core_1.bigint)("category_id", {
        mode: "number",
        unsigned: true,
    }).references(() => category_1.category.id),
    description: (0, mysql_core_1.longtext)("description"),
    duration: (0, mysql_core_1.varchar)("duration", { length: 256 }).notNull().default("60"),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
