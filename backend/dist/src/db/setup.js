"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
const mysql2_2 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUrl = process.env.NODE_ENV == "development"
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD;
if (!dbUrl) {
    throw new Error("DB credentials error");
}
const connection = mysql2_2.default.createConnection(dbUrl);
exports.db = (0, mysql2_1.drizzle)(connection);
