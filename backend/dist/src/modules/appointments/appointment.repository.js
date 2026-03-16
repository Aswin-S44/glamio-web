"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatus = exports.getStatusIdByName = exports.getAppointmentsById = exports.getAppointmentByAppointmentId = exports.getAppointmentsBySHopId = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const appointments_1 = require("../../db/schemas/appointments");
const setup_1 = require("../../db/setup");
const users_1 = require("../../db/schemas/users");
const experts_1 = require("../../db/schemas/experts");
const slots_1 = require("../../db/schemas/slots");
const appointment_status_1 = require("../../db/schemas/appointment_status");
const getAppointmentsBySHopId = (shopId) => {
    return (setup_1.db
        .select({
        appointment: appointments_1.appointments,
        // shop: shopOwners,
        customer: {
            id: users_1.users.id,
            username: users_1.users.username,
            email: users_1.users.email,
            phone: users_1.users.phone,
            profileImage: users_1.users.profileImage,
        },
        expert: experts_1.experts,
        slot: slots_1.slots,
    })
        .from(appointments_1.appointments)
        // .innerJoin(shopOwners, eq(appointments.shopId, shopOwners.id))
        .innerJoin(users_1.users, (0, drizzle_orm_1.eq)(appointments_1.appointments.customerId, users_1.users.id))
        .innerJoin(experts_1.experts, (0, drizzle_orm_1.eq)(appointments_1.appointments.expertId, experts_1.experts.id))
        .innerJoin(slots_1.slots, (0, drizzle_orm_1.eq)(appointments_1.appointments.slotId, slots_1.slots.id))
        .where((0, drizzle_orm_1.eq)(appointments_1.appointments.shopId, shopId)));
};
exports.getAppointmentsBySHopId = getAppointmentsBySHopId;
const getAppointmentByAppointmentId = (id) => {
    return setup_1.db
        .select({
        appointment: appointments_1.appointments,
        customer: {
            id: users_1.users.id,
            username: users_1.users.username,
            email: users_1.users.email,
            phone: users_1.users.phone,
            profileImage: users_1.users.profileImage,
        },
        expert: experts_1.experts,
        slot: slots_1.slots,
    })
        .from(appointments_1.appointments)
        .innerJoin(users_1.users, (0, drizzle_orm_1.eq)(appointments_1.appointments.customerId, users_1.users.id))
        .innerJoin(experts_1.experts, (0, drizzle_orm_1.eq)(appointments_1.appointments.expertId, experts_1.experts.id))
        .innerJoin(slots_1.slots, (0, drizzle_orm_1.eq)(appointments_1.appointments.slotId, slots_1.slots.id))
        .where((0, drizzle_orm_1.eq)(appointments_1.appointments.id, id));
};
exports.getAppointmentByAppointmentId = getAppointmentByAppointmentId;
const getAppointmentsById = async (id) => {
    const [appointment] = await setup_1.db
        .select()
        .from(appointments_1.appointments)
        .where((0, drizzle_orm_1.eq)(appointments_1.appointments.id, id))
        .limit(1);
    return appointment;
};
exports.getAppointmentsById = getAppointmentsById;
const getStatusIdByName = async (name) => {
    const [status] = await setup_1.db
        .select({ id: appointment_status_1.appointmentStatus.id })
        .from(appointment_status_1.appointmentStatus)
        .where((0, drizzle_orm_1.eq)(appointment_status_1.appointmentStatus.name, name))
        .limit(1);
    return status?.id;
};
exports.getStatusIdByName = getStatusIdByName;
const updateAppointmentStatus = async (appointmentId, statusId) => {
    return await setup_1.db
        .update(appointments_1.appointments)
        .set({
        statusId,
        confirmedAt: new Date(), // Sets YYYY-MM-DD
    })
        .where((0, drizzle_orm_1.eq)(appointments_1.appointments.id, appointmentId));
};
exports.updateAppointmentStatus = updateAppointmentStatus;
