"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.userTypes = (0, mysql_core_1.mysqlTable)("user_types", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: (0, mysql_core_1.varchar)("name", { length: 256 }).notNull(),
}, (table) => ({
    nameUnique: (0, mysql_core_1.unique)("uq_user_types_name").on(table.name),
}));
