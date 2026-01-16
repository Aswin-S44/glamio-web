import {
  bigint,
  boolean,
  date,
  int,
  mysqlTable,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { shopOwners } from "./shop-owners";

export const slots = mysqlTable("slots", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  shopId: bigint("shop_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => shopOwners.id),
  slotDate: date("slot_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  maxCapacity: int("max_capacity").notNull(),
  bookedCount: int("booked_count").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  isRecurring: boolean("is_recurring").notNull().default(false),
  contactPhone: varchar("contact_phone", { length: 15 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
