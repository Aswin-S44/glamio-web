import {
  bigint,
  decimal,
  int,
  mysqlTable,
  timestamp,
  date,
} from "drizzle-orm/mysql-core";
import { shopOwners } from "./shop-owners";

export const shopStatistics = mysqlTable("shop_statistics", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  shopId: bigint("shop_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => shopOwners.id),

  // The specific day these stats belong to (used for the Chart)
  statDate: date("stat_date").notNull(),

  // "Total Revenue" for that day
  dailyRevenue: decimal("daily_revenue", { precision: 12, scale: 2 })
    .notNull()
    .default("0.00"),

  // "Appointments" count for that day
  appointmentsCount: int("appointments_count").notNull().default(0),

  // "Active Clients" (unique customers) for that day
  uniqueCustomersCount: int("unique_customers_count").notNull().default(0),

  // To track growth, we store total accumulated revenue up to this date
  totalAccumulatedRevenue: decimal("total_accumulated_revenue", {
    precision: 15,
    scale: 2,
  })
    .notNull()
    .default("0.00"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
