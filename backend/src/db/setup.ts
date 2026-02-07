import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB credentials error");
}
const connection = mysql.createConnection(dbUrl);

export const db = drizzle(connection);
