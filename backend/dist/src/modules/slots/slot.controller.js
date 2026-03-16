"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSlotById = exports.updateSlotById = exports.getSlots = exports.createSlot = void 0;
const slot_service_1 = require("./slot.service");
const shop_repository_1 = require("../shops/shop.repository");
const createSlot = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const shop = await (0, shop_repository_1.findShopByUserId)(userId);
        if (!shop) {
            res.status(401).json({ message: "Shop Not found" });
            return;
        }
        const shopId = shop.shop?.id;
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
            return;
        }
        await slot_service_1.SlotService.createSlot(shopId, req.body);
        res.status(201).json({ message: "Slot created successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createSlot = createSlot;
const getSlots = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        const slots = await slot_service_1.SlotService.getSlots(shopId);
        res.status(200).json({ slots });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getSlots = getSlots;
const updateSlotById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, slot_service_1.updateSlotService)(Number(req.params.id), shopId, req.body);
        res.json({ message: "Slots updated successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.updateSlotById = updateSlotById;
const deleteSlotById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, slot_service_1.deleteSlotService)(Number(req.params.id), shopId);
        res.json({ message: "Slots deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteSlotById = deleteSlotById;
