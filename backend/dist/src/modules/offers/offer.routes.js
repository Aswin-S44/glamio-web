"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const offer_controller_1 = require("./offer.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, offer_controller_1.OfferController.addOffer);
router.get("/", auth_middleware_1.default, offer_controller_1.OfferController.getOffers);
router.get("/:id", auth_middleware_1.default, offer_controller_1.OfferController.getOfferById);
router.patch("/:id", auth_middleware_1.default, offer_controller_1.OfferController.updateOfferById);
router.delete("/:id", auth_middleware_1.default, offer_controller_1.OfferController.deleteOfferById);
exports.default = router;
