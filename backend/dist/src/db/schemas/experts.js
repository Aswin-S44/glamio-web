"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experts = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const shop_owners_1 = require("./shop-owners");
exports.experts = (0, mysql_core_1.mysqlTable)("experts", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    shopId: (0, mysql_core_1.bigint)("shop_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    name: (0, mysql_core_1.varchar)("name", { length: 100 }).notNull(),
    about: (0, mysql_core_1.longtext)("about"),
    address: (0, mysql_core_1.varchar)("address", { length: 500 }),
    image: (0, mysql_core_1.longtext)("image"),
    specialist: (0, mysql_core_1.varchar)("specialist", { length: 100 }).notNull(),
    isActive: (0, mysql_core_1.boolean)("is_active").notNull().default(true),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
