import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const category = mysqlTable("category", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});
