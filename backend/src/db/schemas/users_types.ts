import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userTypes = mysqlTable("user_types", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});
