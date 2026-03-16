"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, slot_controller_1.createSlot);
router.get("/", auth_middleware_1.default, slot_controller_1.getSlots);
router.patch("/:id", auth_middleware_1.default, slot_controller_1.updateSlotById);
router.delete("/:id", auth_middleware_1.default, slot_controller_1.deleteSlotById);
exports.default = router;
