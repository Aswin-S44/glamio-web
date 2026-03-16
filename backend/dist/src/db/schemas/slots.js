"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slots = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const shop_owners_1 = require("./shop-owners");
exports.slots = (0, mysql_core_1.mysqlTable)("slots", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    shopId: (0, mysql_core_1.bigint)("shop_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    slotDate: (0, mysql_core_1.date)("slot_date").notNull(),
    startTime: (0, mysql_core_1.time)("start_time").notNull(),
    endTime: (0, mysql_core_1.time)("end_time").notNull(),
    maxCapacity: (0, mysql_core_1.int)("max_capacity").notNull(),
    bookedCount: (0, mysql_core_1.int)("booked_count").notNull().default(0),
    isAvailable: (0, mysql_core_1.boolean)("is_available").notNull().default(true),
    isRecurring: (0, mysql_core_1.boolean)("is_recurring").notNull().default(false),
    // contactPhone: varchar("contact_phone", { length: 15 }),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
