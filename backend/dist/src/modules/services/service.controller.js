"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServiceById = exports.updateServiceById = exports.getServiceById = exports.getServices = exports.createService = void 0;
const service_service_1 = require("./service.service");
const slot_service_1 = require("../slots/slot.service");
const createService = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, service_service_1.createServiceService)(shopId, req.body);
        res.status(201).json({ message: "Service created successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.createService = createService;
const getServices = async (req, res) => {
    const userId = req.user?.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";
    const categoryName = req.query.category || "All";
    if (!userId)
        return res.status(401).json({ message: "Unauthorized" });
    const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
    if (!shopId)
        return res.status(404).json({ message: "Shop not found" });
    const offset = (page - 1) * limit;
    const [services, totalCountResult] = await Promise.all([
        (0, service_service_1.getServicesService)(shopId, limit, offset, search, categoryName),
        (0, service_service_1.getServicesCountService)(shopId, search, categoryName),
    ]);
    const totalCount = totalCountResult[0].count;
    res.json({
        services,
        pagination: {
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            limit,
        },
    });
};
exports.getServices = getServices;
const getServiceById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        const service = await (0, service_service_1.getServiceByIdService)(Number(req.params.id), shopId);
        res.json(service);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getServiceById = getServiceById;
const updateServiceById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, service_service_1.updateServiceService)(Number(req.params.id), shopId, req.body);
        res.json({ message: "Service updated successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.updateServiceById = updateServiceById;
const deleteServiceById = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
        if (!shopId) {
            res.status(401).json({ message: "Shop not found" });
        }
        await (0, service_service_1.deleteServiceService)(Number(req.params.id), shopId);
        res.json({ message: "Service deleted successfully" });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.deleteServiceById = deleteServiceById;
