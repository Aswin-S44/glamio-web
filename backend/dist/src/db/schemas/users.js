"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const users_types_1 = require("./users_types");
exports.users = (0, mysql_core_1.mysqlTable)("users", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    username: (0, mysql_core_1.varchar)("username", { length: 256 }).notNull(),
    email: (0, mysql_core_1.varchar)("email", { length: 256 }).notNull().unique(),
    phone: (0, mysql_core_1.varchar)("phone", { length: 15 }).unique(),
    isActive: (0, mysql_core_1.boolean)("is_active").notNull().default(false),
    emailVerified: (0, mysql_core_1.boolean)("email_verified").notNull().default(false),
    fcmToken: (0, mysql_core_1.varchar)("fcm_token", { length: 256 }),
    profileImage: (0, mysql_core_1.varchar)("profile_image", { length: 256 }),
    userTypeId: (0, mysql_core_1.bigint)("user_type_id", {
        mode: "number",
        unsigned: true,
    })
        .notNull()
        .references(() => users_types_1.userTypes.id),
    createdAt: (0, mysql_core_1.timestamp)("created_at").defaultNow().notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at").defaultNow().onUpdateNow().notNull(),
});
