"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("./appointment.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.default, appointment_controller_1.getAppointmetns);
router.get("/:id", auth_middleware_1.default, appointment_controller_1.getAppointmentDetailsById);
router.patch("/:id/approve", auth_middleware_1.default, appointment_controller_1.approveAppointment);
exports.default = router;
