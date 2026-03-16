"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setup_1 = require("../db/setup");
const users_1 = require("../db/schemas/users");
const drizzle_orm_1 = require("drizzle-orm");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization token missing" });
        }
        const decoded = jsonwebtoken_1.default.verify(authHeader, process.env.JWT_SECRET || "add");
        const [user] = await setup_1.db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.email, decoded.email))
            .limit(1);
        if (!user) {
            return res.status(401).json({ message: "Invalid token user" });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: "User account is disabled" });
        }
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
