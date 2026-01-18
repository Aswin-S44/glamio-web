import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

const dbUrl =
  process.env.DB_URL || "mysql://root:root1234@localhost:3306/glamio";

if (!dbUrl) {
  throw new Error("DB credentials error");
}
const connection = mysql.createConnection(dbUrl);

export const db = drizzle(connection);
