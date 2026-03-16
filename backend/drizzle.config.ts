import { defineConfig } from "drizzle-kit";

const dbUrl =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD;

if (!dbUrl) {
  throw new Error("DB URL is missing");
}

export default defineConfig({
  schema: "./src/db/schemas/**/*.{ts,js}",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: dbUrl,
  },
});
