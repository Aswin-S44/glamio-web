"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpertById = exports.updateExpertById = exports.getExpertById = exports.getExperts = exports.addExpert = void 0;
const expert_service_1 = require("./expert.service");
const slot_service_1 = require("../slots/slot.service");
const addExpert = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, expert_service_1.addExpertService)(shopId, req.body);
        res.status(201).json({ message: "Expert created successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.addExpert = addExpert;
const getExperts = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
    }
    const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
    if (!shopId) {
        res.status(401).json({ message: "Shop not found" });
    }
    const experts = await (0, expert_service_1.getExpertsService)(shopId);
    res.json({ experts });
};
exports.getExperts = getExperts;
const getExpertById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        const expert = await (0, expert_service_1.getExpertByIdService)(Number(req.params.id), shopId);
        res.json(expert);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getExpertById = getExpertById;
const updateExpertById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, expert_service_1.updateExpertService)(Number(req.params.id), shopId, req.body);
        res.json({ message: "Expert updated successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.updateExpertById = updateExpertById;
const deleteExpertById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, expert_service_1.deleteExpertService)(Number(req.params.id), shopId);
        res.json({ message: "Expert deleted successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.deleteExpertById = deleteExpertById;
