"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpertDB = exports.updateExpertDB = exports.getExpertByIdDB = exports.getExpertsByShopId = exports.createExpertDB = void 0;
const setup_1 = require("../../db/setup");
const experts_1 = require("../../db/schemas/experts");
const drizzle_orm_1 = require("drizzle-orm");
const createExpertDB = async (data) => {
    try {
        return await setup_1.db.insert(experts_1.experts).values(data);
    }
    catch (error) {
        console.error("FULL DATABASE ERROR:", error.message);
        throw error;
    }
};
exports.createExpertDB = createExpertDB;
const getExpertsByShopId = (shopId) => {
    return setup_1.db.select().from(experts_1.experts).where((0, drizzle_orm_1.eq)(experts_1.experts.shopId, shopId));
};
exports.getExpertsByShopId = getExpertsByShopId;
const getExpertByIdDB = (id, shopId) => {
    return setup_1.db
        .select()
        .from(experts_1.experts)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(experts_1.experts.id, id), (0, drizzle_orm_1.eq)(experts_1.experts.shopId, shopId)))
        .limit(1);
};
exports.getExpertByIdDB = getExpertByIdDB;
const updateExpertDB = (id, data) => {
    return setup_1.db.update(experts_1.experts).set(data).where((0, drizzle_orm_1.eq)(experts_1.experts.id, id));
};
exports.updateExpertDB = updateExpertDB;
const deleteExpertDB = (id, shopId) => {
    return setup_1.db
        .delete(experts_1.experts)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(experts_1.experts.id, id), (0, drizzle_orm_1.eq)(experts_1.experts.shopId, shopId)));
};
exports.deleteExpertDB = deleteExpertDB;
