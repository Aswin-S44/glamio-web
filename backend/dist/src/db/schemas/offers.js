"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offersRelations = exports.offers = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const shop_owners_1 = require("./shop-owners");
const category_1 = require("./category");
const services_1 = require("./services");
const drizzle_orm_1 = require("drizzle-orm");
exports.offers = (0, mysql_core_1.mysqlTable)("offers", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    categoryId: (0, mysql_core_1.bigint)("category_id", {
        mode: "number",
        unsigned: true,
    })
        .notNull()
        .references(() => category_1.category.id),
    offerPrice: (0, mysql_core_1.int)("offer_price").notNull(),
    regularPrice: (0, mysql_core_1.int)("regular_price").notNull(),
    serviceId: (0, mysql_core_1.bigint)("service_id", {
        mode: "number",
        unsigned: true,
    })
        .notNull()
        .references(() => services_1.services.id),
    shopId: (0, mysql_core_1.bigint)("shop_id", {
        mode: "number",
        unsigned: true,
    })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
exports.offersRelations = (0, drizzle_orm_1.relations)(exports.offers, ({ one }) => ({
    service: one(services_1.services, {
        fields: [exports.offers.serviceId],
        references: [services_1.services.id],
    }),
}));
