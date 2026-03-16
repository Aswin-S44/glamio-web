"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServicesByIds = exports.getServiceByIdDB = exports.deleteServiceDB = exports.updateServiceDB = exports.findServiceByIdAndShop = exports.getServicesByShopId = exports.createServiceDB = exports.createCategory = exports.findCategoryByName = void 0;
const setup_1 = require("../../db/setup");
const services_1 = require("../../db/schemas/services");
const category_1 = require("../../db/schemas/category");
const drizzle_orm_1 = require("drizzle-orm");
const findCategoryByName = async (name) => {
    const [result] = await setup_1.db
        .select()
        .from(category_1.category)
        .where((0, drizzle_orm_1.eq)(category_1.category.name, name))
        .limit(1);
    return result || null;
};
exports.findCategoryByName = findCategoryByName;
const createCategory = async (name) => {
    const [result] = await setup_1.db.insert(category_1.category).values({ name }).$returningId();
    return Number(result.id);
};
exports.createCategory = createCategory;
const createServiceDB = async (data) => {
    return setup_1.db.insert(services_1.services).values(data);
};
exports.createServiceDB = createServiceDB;
const getServicesByShopId = (shopId) => {
    return setup_1.db.select().from(services_1.services).where((0, drizzle_orm_1.eq)(services_1.services.shopId, shopId));
};
exports.getServicesByShopId = getServicesByShopId;
const findServiceByIdAndShop = (id, shopId) => {
    return setup_1.db
        .select({ id: services_1.services.id })
        .from(services_1.services)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(services_1.services.id, id), (0, drizzle_orm_1.eq)(services_1.services.shopId, shopId)));
};
exports.findServiceByIdAndShop = findServiceByIdAndShop;
const updateServiceDB = (id, data) => {
    return setup_1.db.update(services_1.services).set(data).where((0, drizzle_orm_1.eq)(services_1.services.id, id));
};
exports.updateServiceDB = updateServiceDB;
const deleteServiceDB = (id, shopId) => {
    return setup_1.db
        .delete(services_1.services)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(services_1.services.id, id), (0, drizzle_orm_1.eq)(services_1.services.shopId, shopId)));
};
exports.deleteServiceDB = deleteServiceDB;
const getServiceByIdDB = (id, shopId) => {
    return setup_1.db
        .select()
        .from(services_1.services)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(services_1.services.id, id), (0, drizzle_orm_1.eq)(services_1.services.shopId, shopId)))
        .limit(1);
};
exports.getServiceByIdDB = getServiceByIdDB;
const getServicesByIds = async (serviceIds) => {
    return setup_1.db
        .select({
        id: services_1.services.id,
        rate: services_1.services.rate,
    })
        .from(services_1.services)
        .where((0, drizzle_orm_1.inArray)(services_1.services.id, serviceIds));
};
exports.getServicesByIds = getServicesByIds;
