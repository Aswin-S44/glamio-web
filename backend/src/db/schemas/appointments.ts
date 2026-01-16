import {
  bigint,
  date,
  int,
  json,
  mysqlTable,
  timestamp,
} from "drizzle-orm/mysql-core";

import { shopOwners } from "./shop-owners";

import { appointmentStatus } from "./appointment_status";
import { users } from "./users";
import { experts } from "./experts";
import { slots } from "./slots";

export const appointments = mysqlTable("appointments", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  statusId: int("status_id")
    .notNull()
    .references(() => appointmentStatus.id),
  confirmedAt: date("confirmed_at").notNull(),
  customerId: int("customer_id")
    .notNull()
    .references(() => users.id),
  expertId: int("expert_id")
    .notNull()
    .references(() => experts.id),
  slotId: int("slot_id")
    .notNull()
    .references(() => slots.id),
  shopId: int("shop_id")
    .notNull()
    .references(() => shopOwners.id),

  rate: int("rate").notNull().default(0),

  serviceIds: json("service_ids").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
