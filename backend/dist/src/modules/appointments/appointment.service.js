"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveAppointmentLogic = exports.getAppointmentById = exports.getAppointmentService = void 0;
const slot_service_1 = require("../slots/slot.service");
const appointment_repository_1 = require("./appointment.repository");
const getAppointmentService = async (shopId) => {
    return await (0, appointment_repository_1.getAppointmentsBySHopId)(shopId);
};
exports.getAppointmentService = getAppointmentService;
const getAppointmentById = async (id) => {
    const result = await (0, appointment_repository_1.getAppointmentByAppointmentId)(id);
    return result[0] || null;
};
exports.getAppointmentById = getAppointmentById;
const approveAppointmentLogic = async (appointmentId, userId) => {
    const appointment = await (0, appointment_repository_1.getAppointmentsById)(appointmentId);
    if (!appointment)
        throw new Error("NOT_FOUND");
    // Security: Check if the shop owner making the request owns this shop
    const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
    if (appointment.shopId !== shopId) {
        throw new Error("UNAUTHORIZED");
    }
    const acceptedStatusId = await (0, appointment_repository_1.getStatusIdByName)("accepted");
    if (!acceptedStatusId)
        throw new Error("STATUS_ERROR");
    await (0, appointment_repository_1.updateAppointmentStatus)(appointmentId, acceptedStatusId);
    return { message: "Appointment approved successfully" };
};
exports.approveAppointmentLogic = approveAppointmentLogic;
