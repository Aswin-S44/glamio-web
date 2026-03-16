"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopStatistics = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const shop_owners_1 = require("./shop-owners");
exports.shopStatistics = (0, mysql_core_1.mysqlTable)("shop_statistics", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    shopId: (0, mysql_core_1.bigint)("shop_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    // The specific day these stats belong to (used for the Chart)
    statDate: (0, mysql_core_1.date)("stat_date").notNull(),
    // "Total Revenue" for that day
    dailyRevenue: (0, mysql_core_1.decimal)("daily_revenue", { precision: 12, scale: 2 })
        .notNull()
        .default("0.00"),
    // "Appointments" count for that day
    appointmentsCount: (0, mysql_core_1.int)("appointments_count").notNull().default(0),
    // "Active Clients" (unique customers) for that day
    uniqueCustomersCount: (0, mysql_core_1.int)("unique_customers_count").notNull().default(0),
    // To track growth, we store total accumulated revenue up to this date
    totalAccumulatedRevenue: (0, mysql_core_1.decimal)("total_accumulated_revenue", {
        precision: 15,
        scale: 2,
    })
        .notNull()
        .default("0.00"),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
