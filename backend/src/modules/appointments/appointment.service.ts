import {
  getAppointmentByAppointmentId,
  getAppointmentsBySHopId,
} from "./appointment.repository";

export const getAppointmentService = (shopId: number) => {
  return getAppointmentsBySHopId(shopId);
};

export const getAppointmentById = (id: number) => {
  return getAppointmentByAppointmentId(id);
};
