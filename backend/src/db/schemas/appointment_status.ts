import { bigint, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const appointmentStatus = mysqlTable("appointment_status", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});
