import {
  bigint,
  date,
  int,
  json,
  mysqlTable,
  timestamp,
} from "drizzle-orm/mysql-core";
import { appointmentStatus } from "./appointment_status";
import { users } from "./users";
import { experts } from "./experts";
import { slots } from "./slots";
import { shopOwners } from "./shop-owners";

export const appointments = mysqlTable("appointments", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(), 

  statusId: bigint("status_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => appointmentStatus.id),

  customerId: bigint("customer_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id),

  expertId: bigint("expert_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => experts.id),

  slotId: bigint("slot_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => slots.id),

  shopId: bigint("shop_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => shopOwners.id),

  confirmedAt: date("confirmed_at"),
  rate: int("rate").notNull().default(0),
  serviceIds: json("service_ids").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
