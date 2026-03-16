"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifications = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const shop_owners_1 = require("./shop-owners");
const users_1 = require("./users");
const notification_types_1 = require("./notification-types");
exports.notifications = (0, mysql_core_1.mysqlTable)("notifications", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    notificationTypeId: (0, mysql_core_1.bigint)("notification_type_id", {
        mode: "number",
        unsigned: true,
    })
        .notNull()
        .references(() => notification_types_1.notificationTypes.id),
    fromId: (0, mysql_core_1.bigint)("from_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => users_1.users.id),
    toId: (0, mysql_core_1.bigint)("to_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => users_1.users.id),
    message: (0, mysql_core_1.varchar)("message", { length: 500 }).notNull(),
    isRead: (0, mysql_core_1.boolean)("is_read").notNull().default(false),
    shopId: (0, mysql_core_1.bigint)("shop_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => shop_owners_1.shopOwners.id),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
