"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const dbUrl = process.env.NODE_ENV === "development"
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD;
if (!dbUrl) {
    throw new Error("DB URL is missing");
}
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/db/schemas/**/*.{ts,js}",
    out: "./src/db/migrations",
    dialect: "mysql",
    dbCredentials: {
        url: dbUrl,
    },
});
