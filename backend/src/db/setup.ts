import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const dbUrl =
  process.env.NODE_ENV == "development"
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD;

if (!dbUrl) {
  throw new Error("DB credentials error");
}
const connection = mysql.createConnection(dbUrl);

export const db = drizzle(connection);
