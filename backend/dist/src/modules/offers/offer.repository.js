"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferRepository = void 0;
const setup_1 = require("../../db/setup");
const offers_1 = require("../../db/schemas/offers");
const drizzle_orm_1 = require("drizzle-orm");
const services_1 = require("../../db/schemas/services");
class OfferRepository {
    static findByCategory(shopId, categoryId) {
        return setup_1.db
            .select()
            .from(offers_1.offers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(offers_1.offers.shopId, shopId), (0, drizzle_orm_1.eq)(offers_1.offers.categoryId, categoryId)));
    }
    static findAllByShop(shopId) {
        return setup_1.db
            .select({
            id: offers_1.offers.id,
            offerPrice: offers_1.offers.offerPrice,
            regularPrice: offers_1.offers.regularPrice,
            createdAt: offers_1.offers.createdAt,
            updatedAt: offers_1.offers.updatedAt,
            // Include service details here
            service: {
                id: services_1.services.id,
                name: services_1.services.name,
                imageUrl: services_1.services.imageUrl,
                description: services_1.services.description,
                duration: services_1.services.duration,
            },
        })
            .from(offers_1.offers)
            .innerJoin(services_1.services, (0, drizzle_orm_1.eq)(offers_1.offers.serviceId, services_1.services.id)) // Join condition
            .where((0, drizzle_orm_1.eq)(offers_1.offers.shopId, shopId));
    }
    static findById(shopId, offerId) {
        return setup_1.db
            .select()
            .from(offers_1.offers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(offers_1.offers.id, offerId), (0, drizzle_orm_1.eq)(offers_1.offers.shopId, shopId)));
    }
    static create(shopId, data) {
        const { categoryId, offerPrice, regularPrice, serviceId } = data;
        return setup_1.db
            .insert(offers_1.offers)
            .values({ categoryId, offerPrice, regularPrice, serviceId, shopId });
    }
    static update(shopId, offerId, data) {
        return setup_1.db
            .update(offers_1.offers)
            .set(data)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(offers_1.offers.id, offerId), (0, drizzle_orm_1.eq)(offers_1.offers.shopId, shopId)));
    }
    static delete(shopId, offerId) {
        return setup_1.db
            .delete(offers_1.offers)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(offers_1.offers.id, offerId), (0, drizzle_orm_1.eq)(offers_1.offers.shopId, shopId)));
    }
}
exports.OfferRepository = OfferRepository;
