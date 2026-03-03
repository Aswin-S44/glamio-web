import {
  getAppointmentByAppointmentId,
  getAppointmentsBySHopId,
} from "./appointment.repository";

export const getAppointmentService = async (shopId: number) => {
  return await getAppointmentsBySHopId(shopId);
};

export const getAppointmentById = async (id: number) => {
  const result = await getAppointmentByAppointmentId(id);
  return result[0] || null;
};
