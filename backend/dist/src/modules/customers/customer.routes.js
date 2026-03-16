"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("./customer.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/shops", customer_controller_1.getAllShops);
router.get("/shop/:id", customer_controller_1.getShopById);
router.get("/experts/:shopId", customer_controller_1.getExpertsByShopId);
router.get("/slots/:shopId", customer_controller_1.getSlotsByShopId);
router.post("/booking", auth_middleware_1.default, customer_controller_1.createBooking);
router.get("/reviews/:placeId", customer_controller_1.getShopReviewsAndImages);
router.get("/services", customer_controller_1.getAllShopsServices);
router.get("/order/summary/:shopId/:slotId/:expertId", customer_controller_1.getOrderSummary);
exports.default = router;
