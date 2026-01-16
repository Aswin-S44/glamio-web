import {
  bigint,
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
  decimal,
  json,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

export const shopOwners = mysqlTable("shop_owners", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id),
  about: varchar("about", { length: 256 }).notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  googleReviewUrl: varchar("google_review_url", { length: 500 }),
  isOnboarded: boolean("is_onboarded").notNull().default(false),
  openingHours: json("opening_hours").notNull(),
  parlourName: varchar("parlour_name", { length: 256 }).notNull(),
  placeId: varchar("place_id", { length: 100 }),
  totalRating: int("total_rating").notNull().default(0),
});
