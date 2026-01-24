import { eq } from "drizzle-orm";
import { appointments } from "../../db/schemas/appointments";
import { db } from "../../db/setup";

export const getAppointmentsBySHopId = (shopId: number) => {
  return db.select().from(appointments).where(eq(appointments.shopId, shopId));
};

export const getAppointmentByAppointmentId = (id: number) => {
  return db.select().from(appointments).where(eq(appointments.id, id));
};
