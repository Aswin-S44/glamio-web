"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderSummary = exports.getAllShopsServices = exports.getShopReviewsAndImages = exports.createBooking = exports.getSlotsByShopId = exports.getExpertsByShopId = exports.getShopById = exports.getAllShops = void 0;
const customer_service_1 = require("./customer.service");
const slot_service_1 = require("../slots/slot.service");
const constants_1 = require("../../constants/constants");
const setup_1 = require("../../db/setup");
const shop_owners_1 = require("../../db/schemas/shop-owners");
const drizzle_orm_1 = require("drizzle-orm");
const slots_1 = require("../../db/schemas/slots");
const experts_1 = require("../../db/schemas/experts");
const services_1 = require("../../db/schemas/services");
const getAllShops = async (req, res) => {
    const shops = await (0, customer_service_1.getAllShopsService)();
    res.json({ shops });
};
exports.getAllShops = getAllShops;
const getShopById = async (req, res) => {
    try {
        const shop = await (0, customer_service_1.getShopByIdService)(Number(req.params.id));
        res.json(shop);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getShopById = getShopById;
const getExpertsByShopId = async (req, res) => {
    const experts = await (0, customer_service_1.getAllExpertsByShopIdService)(Number(req.params.shopId));
    res.json({ experts });
};
exports.getExpertsByShopId = getExpertsByShopId;
const getSlotsByShopId = async (req, res) => {
    try {
        const shopIdParam = req.params.shopId;
        if (!shopIdParam || Array.isArray(shopIdParam)) {
            res.status(400).json({ message: "Invalid shopId" });
            return;
        }
        const shopId = Number(shopIdParam);
        if (isNaN(shopId)) {
            res.status(400).json({ message: "shopId must be a number" });
            return;
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
exports.getSlotsByShopId = getSlotsByShopId;
const createBooking = async (req, res) => {
    try {
        const shopId = Number(req.body.shopId);
        const slotId = Number(req.body.slotId);
        const expertId = Number(req.body.expertId);
        const customerId = Number(req.user?.id);
        const appointmentStatus = constants_1.appointmentStatuses.PENDING;
        const selectedServices = req.body.serviceIds;
        const bookingRate = await customer_service_1.BookingService.calculateTotalRate(selectedServices);
        const dataToUpdate = {
            statusId: 1,
            customerId,
            expertId,
            slotId,
            shopId,
            serviceIds: selectedServices,
            rate: bookingRate,
        };
        // const existingBooking = await findExistingBookingService(dataToUpdate);
        // if (existingBooking) {
        //   res.status(400).json({
        //     message: "booking already exists with this shop , and statusId 1",
        //   });
        //   return;
        // }
        const result = await (0, customer_service_1.createBookingService)(dataToUpdate);
        res.status(201).send({ appointment: result });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createBooking = createBooking;
const getShopReviewsAndImages = async (req, res) => {
    try {
        const { placeId } = req.params;
        if (!placeId || Array.isArray(placeId)) {
            res.status(400).json({ message: "Invalid placeId" });
            return;
        }
        const result = await (0, customer_service_1.getSHopReviewsAndImageServices)(placeId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getShopReviewsAndImages = getShopReviewsAndImages;
const getAllShopsServices = async (req, res) => {
    try {
        let limit = 1;
        let offset = 10;
        const result = await (0, customer_service_1.getAllServices)(limit, offset);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getAllShopsServices = getAllShopsServices;
const getOrderSummary = async (req, res) => {
    try {
        const { shopId, slotId, expertId } = req.params;
        const rawServiceId = req.query.serviceId;
        if (rawServiceId === undefined ||
            (typeof rawServiceId === "object" && !Array.isArray(rawServiceId))) {
            res.status(400).json({ message: "serviceId is required" });
            return;
        }
        const serviceIds = (Array.isArray(rawServiceId) ? rawServiceId : rawServiceId.split(","))
            .map(Number)
            .filter((id) => !isNaN(id));
        if (!serviceIds.length) {
            res.status(400).json({ message: "Invalid serviceId" });
            return;
        }
        const [shop] = await setup_1.db
            .select()
            .from(shop_owners_1.shopOwners)
            .where((0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.id, Number(shopId)));
        const [slot] = await setup_1.db
            .select()
            .from(slots_1.slots)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(slots_1.slots.id, Number(slotId)), (0, drizzle_orm_1.eq)(slots_1.slots.shopId, Number(shopId))));
        const [expert] = await setup_1.db
            .select()
            .from(experts_1.experts)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(experts_1.experts.id, Number(expertId)), (0, drizzle_orm_1.eq)(experts_1.experts.shopId, Number(shopId))));
        const selectedServices = await setup_1.db
            .select()
            .from(services_1.services)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(services_1.services.shopId, Number(shopId)), (0, drizzle_orm_1.inArray)(services_1.services.id, serviceIds)));
        const [total] = await setup_1.db
            .select({ totalRate: (0, drizzle_orm_1.sum)(services_1.services.rate) })
            .from(services_1.services)
            .where((0, drizzle_orm_1.inArray)(services_1.services.id, serviceIds));
        res.status(200).json({
            shop,
            slot,
            expert,
            services: selectedServices,
            totalRate: Number(total?.totalRate ?? 0),
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.getOrderSummary = getOrderSummary;
