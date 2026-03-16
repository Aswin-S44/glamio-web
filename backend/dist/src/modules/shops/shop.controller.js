"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.updateProfile = exports.getProfileById = void 0;
const shop_repository_1 = require("./shop.repository");
const shop_service_1 = require("./shop.service");
const slot_service_1 = require("../slots/slot.service");
const getProfileById = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = Number(req.user.id);
        const service = await (0, shop_repository_1.findShopByUserId)(userId);
        if (!service) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(service);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProfileById = getProfileById;
const updateProfile = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user?.id;
        console.log("BODY-------------", req.body);
        // await updateShopProfile(Number(userId), req.body);
        // res.json({ message: "Expert updated successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.updateProfile = updateProfile;
const getStats = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        const stats = await (0, shop_service_1.getShopDashboardStats)(shopId);
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching statistics" });
    }
};
exports.getStats = getStats;
