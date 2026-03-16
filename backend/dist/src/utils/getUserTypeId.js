"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTypeId = getUserTypeId;
const drizzle_orm_1 = require("drizzle-orm");
const users_types_1 = require("../db/schemas/users_types");
const setup_1 = require("../db/setup");
async function getUserTypeId(userType) {
    const [type] = await setup_1.db
        .select()
        .from(users_types_1.userTypes)
        .where((0, drizzle_orm_1.eq)(users_types_1.userTypes.name, userType))
        .limit(1);
    if (!type) {
        throw new Error("CUSTOMER user type not found");
    }
    return type.id;
}
