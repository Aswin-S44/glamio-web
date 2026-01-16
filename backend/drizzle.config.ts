import { defineConfig } from "drizzle-kit";

if (!process.env.DB_URL) {
  throw new Error("DB URL is missing");
}

export default defineConfig({
  schema: "./src/db/schemas/**/*.{ts,js}",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
