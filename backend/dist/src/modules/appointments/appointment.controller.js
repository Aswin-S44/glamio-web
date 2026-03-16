"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveAppointment = exports.getAppointmentDetailsById = exports.getAppointmetns = void 0;
const appointment_service_1 = require("./appointment.service");
const slot_service_1 = require("../slots/slot.service");
const getAppointmetns = async (req, res) => {
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ message: "Unauthorized" });
    const shopId = await (0, slot_service_1.getShopIdByUserId)(userId);
    if (!shopId)
        return res.status(404).json({ message: "Shop not found" });
    const appointments = await (0, appointment_service_1.getAppointmentService)(shopId);
    res.json({ appointments });
};
exports.getAppointmetns = getAppointmetns;
const getAppointmentDetailsById = async (req, res) => {
    const { id } = req.params;
    const appointment = await (0, appointment_service_1.getAppointmentById)(Number(id));
    if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });
    res.json({ appointment });
};
exports.getAppointmentDetailsById = getAppointmentDetailsById;
const approveAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const result = await (0, appointment_service_1.approveAppointmentLogic)(Number(id), userId);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error.message === "NOT_FOUND") {
            return res.status(404).json({ message: "Appointment not found" });
        }
        if (error.message === "UNAUTHORIZED") {
            return res.status(403).json({
                message: "You do not have permission to approve this appointment",
            });
        }
        return res.status(500).json({ message: "Error approving appointment" });
    }
};
exports.approveAppointment = approveAppointment;
