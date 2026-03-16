"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointments = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const appointment_status_1 = require("./appointment_status");
const users_1 = require("./users");
const experts_1 = require("./experts");
const slots_1 = require("./slots");
const shop_owners_1 = require("./shop-owners");
exports.appointments = (0, mysql_core_1.mysqlTable)("appointments", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    statusId: (0, mysql_core_1.bigint)("status_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => appointment_status_1.appointmentStatus.id),
    customerId: (0, mysql_core_1.bigint)("customer_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => users_1.users.id),
    expertId: (0, mysql_core_1.bigint)("expert_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => experts_1.experts.id),
    slotId: (0, mysql_core_1.bigint)("slot_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => slots_1.slots.id),
    shopId: (0, mysql_core_1.bigint)("shop_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    confirmedAt: (0, mysql_core_1.date)("confirmed_at"),
    rate: (0, mysql_core_1.int)("rate").notNull().default(0),
    serviceIds: (0, mysql_core_1.json)("service_ids").notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
