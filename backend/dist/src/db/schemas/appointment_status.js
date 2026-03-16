"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentStatus = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.appointmentStatus = (0, mysql_core_1.mysqlTable)("appointment_status", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 256 }).notNull(),
});
