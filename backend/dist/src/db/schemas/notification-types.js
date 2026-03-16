"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationTypes = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.notificationTypes = (0, mysql_core_1.mysqlTable)("notification_types", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 256 }).notNull(),
});
