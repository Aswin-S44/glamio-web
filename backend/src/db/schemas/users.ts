import {
  bigint,
  boolean,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { userTypes } from "./users_types";

export const users = mysqlTable("users", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  username: varchar("username", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  phone: varchar("phone", { length: 15 }).unique(),

  isActive: boolean("is_active").notNull().default(false),
  emailVerified: boolean("email_verified").notNull().default(false),

  fcmToken: varchar("fcm_token", { length: 256 }),
  profileImage: varchar("profile_image", { length: 256 }),

  userTypeId: bigint("user_type_id", {
    mode: "number",
    unsigned: true,
  })
    .notNull()
    .references(() => userTypes.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
