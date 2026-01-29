import { defineConfig } from "drizzle-kit";

// if (!process.env.DB_URL) {
//   throw new Error("DB URL is missing");
// }
console.log("##", process.env.DB_URL);

export default defineConfig({
  schema: "./src/db/schemas/**/*.{ts,js}",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: "mysql://glamio_user:Password@123@localhost:3306/glamio",
  },
});
//   process.env.DB_URL || 