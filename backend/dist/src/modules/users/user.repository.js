"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByEmail = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("../../db/schemas/users");
const setup_1 = require("../../db/setup");
const findUserByEmail = async (email) => {
    const result = await setup_1.db
        .select({ id: users_1.users.id })
        .from(users_1.users)
        .where((0, drizzle_orm_1.eq)(users_1.users.email, email))
        .limit(1);
    return result[0] || null;
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data) => {
    return setup_1.db
        .insert(users_1.users)
        .values({
        ...data,
        isActive: true,
        emailVerified: false,
    })
        .$returningId();
};
exports.createUser = createUser;
