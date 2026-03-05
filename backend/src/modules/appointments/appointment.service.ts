import { getShopIdByUserId } from "../slots/slot.service";
import {
  getAppointmentByAppointmentId,
  getAppointmentsById,
  getAppointmentsBySHopId,
  getStatusIdByName,
  updateAppointmentStatus,
} from "./appointment.repository";

export const getAppointmentService = async (shopId: number) => {
  return await getAppointmentsBySHopId(shopId);
};

export const getAppointmentById = async (id: number) => {
  const result = await getAppointmentByAppointmentId(id);
  return result[0] || null;
};

export const approveAppointmentLogic = async (
  appointmentId: number,
  userId: number
) => {
  const appointment = await getAppointmentsById(appointmentId);

  if (!appointment) throw new Error("NOT_FOUND");

  // Security: Check if the shop owner making the request owns this shop
  const shopId = await getShopIdByUserId(userId);
  if (appointment.shopId !== shopId) {
    throw new Error("UNAUTHORIZED");
  }

  const acceptedStatusId = await getStatusIdByName("accepted");
  if (!acceptedStatusId) throw new Error("STATUS_ERROR");

  await updateAppointmentStatus(appointmentId, acceptedStatusId);

  return { message: "Appointment approved successfully" };
};
