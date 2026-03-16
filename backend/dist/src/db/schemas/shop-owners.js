"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopOwners = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const users_1 = require("./users");
exports.shopOwners = (0, mysql_core_1.mysqlTable)("shop_owners", {
    id: (0, mysql_core_1.bigint)("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    userId: (0, mysql_core_1.bigint)("user_id", { mode: "number", unsigned: true })
        .notNull()
        .references(() => users_1.users.id),
    about: (0, mysql_core_1.longtext)("about").notNull(),
    address: (0, mysql_core_1.varchar)("address", { length: 500 }).notNull(),
    latitude: (0, mysql_core_1.decimal)("latitude", { precision: 10, scale: 7 }).notNull(),
    longitude: (0, mysql_core_1.decimal)("longitude", { precision: 10, scale: 7 }).notNull(),
    googleReviewUrl: (0, mysql_core_1.varchar)("google_review_url", { length: 500 }),
    isOnboarded: (0, mysql_core_1.boolean)("is_onboarded").notNull().default(false),
    openingHours: (0, mysql_core_1.json)("opening_hours").notNull(),
    parlourName: (0, mysql_core_1.varchar)("parlour_name", { length: 256 }).notNull(),
    placeId: (0, mysql_core_1.varchar)("place_id", { length: 100 }),
    totalRating: (0, mysql_core_1.int)("total_rating").notNull().default(0),
    isProfileCompleted: (0, mysql_core_1.boolean)("is_profile_completed").default(false),
    shopImage: (0, mysql_core_1.varchar)("shop_image", { length: 256 }),
});
