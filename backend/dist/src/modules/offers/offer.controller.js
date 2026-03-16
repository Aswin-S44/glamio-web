"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const offer_service_1 = require("./offer.service");
const slot_service_1 = require("../slots/slot.service");
class OfferController {
    static async addOffer(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
            }
            const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
            if (!shopId) {
                res.status(401).json({ message: "Shop not found" });
            }
            await offer_service_1.OfferService.createOffer(shopId, req.body);
            res.status(201).json({ message: "Offer created successfully" });
        }
        catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    static async getOffers(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
            }
            const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
            if (!shopId) {
                res.status(401).json({ message: "Shop not found" });
            }
            const offers = await offer_service_1.OfferService.getOffers(shopId);
            res.status(200).json({ offers });
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch offers" });
        }
    }
    static async getOfferById(req, res) {
        try {
            const shopId = req.user?.id;
            const offerId = Number(req.params.id);
            const offer = await offer_service_1.OfferService.getOfferById(shopId, offerId);
            res.status(200).json(offer);
        }
        catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Offer not found",
            });
        }
    }
    static async updateOfferById(req, res) {
        try {
            const shopId = req.user?.id;
            const offerId = Number(req.params.id);
            await offer_service_1.OfferService.updateOffer(shopId, offerId, req.body);
            res.status(200).json({ message: "Offer updated successfully" });
        }
        catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : "Update failed",
            });
        }
    }
    static async deleteOfferById(req, res) {
        try {
            const shopId = req.user?.id;
            const offerId = Number(req.params.id);
            await offer_service_1.OfferService.deleteOffer(shopId, offerId);
            res.status(200).json({ message: "Offer deleted successfully" });
        }
        catch (error) {
            res.status(404).json({
                message: error instanceof Error ? error.message : "Delete failed",
            });
        }
    }
}
exports.OfferController = OfferController;
