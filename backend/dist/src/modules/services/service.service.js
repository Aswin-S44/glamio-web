"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceService = exports.updateServiceService = exports.getServiceByIdService = exports.getServicesCountService = exports.getServicesService = exports.createServiceService = void 0;
const service_repository_1 = require("./service.repository");
const upload_1 = require("../../utils/upload");
const drizzle_orm_1 = require("drizzle-orm");
const services_1 = require("../../db/schemas/services");
const category_1 = require("../../db/schemas/category");
const setup_1 = require("../../db/setup");
const createServiceService = async (shopId, payload) => {
    const { name, imageUrl, rate, category, description, duration } = payload;
    let categoryId;
    const existingCategory = await (0, service_repository_1.findCategoryByName)(category);
    if (existingCategory) {
        categoryId = Number(existingCategory.id);
    }
    else {
        categoryId = await (0, service_repository_1.createCategory)(category);
    }
    const uploadedImage = await (0, upload_1.uploadImage)(imageUrl);
    if (!uploadedImage) {
        throw new Error("Image upload failed");
    }
    await (0, service_repository_1.createServiceDB)({
        name,
        imageUrl: uploadedImage,
        rate,
        shopId,
        categoryId,
        description,
        duration,
    });
};
exports.createServiceService = createServiceService;
const getServicesService = (shopId, limit, offset, search, categoryName) => {
    const conditions = [(0, drizzle_orm_1.eq)(services_1.services.shopId, shopId)];
    if (search) {
        conditions.push((0, drizzle_orm_1.like)(services_1.services.name, `%${search}%`));
    }
    if (categoryName !== "All") {
        conditions.push((0, drizzle_orm_1.eq)(category_1.category.name, categoryName));
    }
    return setup_1.db
        .select({
        id: services_1.services.id,
        name: services_1.services.name,
        imageUrl: services_1.services.imageUrl,
        rate: services_1.services.rate,
        shopId: services_1.services.shopId,
        categoryId: services_1.services.categoryId,
        categoryName: category_1.category.name,
        createdAt: services_1.services.createdAt,
        updatedAt: services_1.services.updatedAt,
        description: services_1.services.description,
        duration: services_1.services.duration,
    })
        .from(services_1.services)
        .leftJoin(category_1.category, (0, drizzle_orm_1.eq)(services_1.services.categoryId, category_1.category.id))
        .where((0, drizzle_orm_1.and)(...conditions))
        .limit(limit)
        .offset(offset);
};
exports.getServicesService = getServicesService;
const getServicesCountService = (shopId, search, categoryName) => {
    const conditions = [(0, drizzle_orm_1.eq)(services_1.services.shopId, shopId)];
    if (search) {
        conditions.push((0, drizzle_orm_1.like)(services_1.services.name, `%${search}%`));
    }
    if (categoryName !== "All") {
        conditions.push((0, drizzle_orm_1.eq)(category_1.category.name, categoryName));
    }
    return setup_1.db
        .select({ count: (0, drizzle_orm_1.count)() })
        .from(services_1.services)
        .leftJoin(category_1.category, (0, drizzle_orm_1.eq)(services_1.services.categoryId, category_1.category.id))
        .where((0, drizzle_orm_1.and)(...conditions));
};
exports.getServicesCountService = getServicesCountService;
const getServiceByIdService = async (id, shopId) => {
    const result = await (0, service_repository_1.getServiceByIdDB)(id, shopId);
    if (!result.length)
        throw new Error("Service not found");
    return result[0];
};
exports.getServiceByIdService = getServiceByIdService;
const updateServiceService = async (id, shopId, data) => {
    const exists = await (0, service_repository_1.findServiceByIdAndShop)(id, shopId);
    if (!exists.length)
        throw new Error("Service not found");
    await (0, service_repository_1.updateServiceDB)(id, data);
};
exports.updateServiceService = updateServiceService;
const deleteServiceService = async (id, shopId) => {
    const exists = await (0, service_repository_1.findServiceByIdAndShop)(id, shopId);
    if (!exists.length)
        throw new Error("Service not found");
    await (0, service_repository_1.deleteServiceDB)(id, shopId);
};
exports.deleteServiceService = deleteServiceService;
