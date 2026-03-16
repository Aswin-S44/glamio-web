"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const offer_repository_1 = require("./offer.repository");
const upload_1 = require("../../utils/upload");
class OfferService {
    static async createOffer(shopId, data) {
        const existing = await offer_repository_1.OfferRepository.findByCategory(shopId, data.categoryId);
        if (existing.length) {
            throw new Error("Offer already exists for this category");
        }
        const imageUrl = data.image ? await (0, upload_1.uploadImage)(data.image) : null;
        return offer_repository_1.OfferRepository.create(shopId, {
            ...data,
            image: imageUrl ?? undefined,
        });
    }
    static getOffers(shopId) {
        return offer_repository_1.OfferRepository.findAllByShop(shopId);
    }
    static async getOfferById(shopId, offerId) {
        const [offer] = await offer_repository_1.OfferRepository.findById(shopId, offerId);
        if (!offer)
            throw new Error("Offer not found");
        return offer;
    }
    static async updateOffer(shopId, offerId, data) {
        await this.getOfferById(shopId, offerId);
        return offer_repository_1.OfferRepository.update(shopId, offerId, data);
    }
    static async deleteOffer(shopId, offerId) {
        await this.getOfferById(shopId, offerId);
        return offer_repository_1.OfferRepository.delete(shopId, offerId);
    }
}
exports.OfferService = OfferService;
