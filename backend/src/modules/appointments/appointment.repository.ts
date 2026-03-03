import { eq } from "drizzle-orm";
import { appointments } from "../../db/schemas/appointments";
import { db } from "../../db/setup";
import { users } from "../../db/schemas/users";
import { experts } from "../../db/schemas/experts";
import { slots } from "../../db/schemas/slots";
import { shopOwners } from "../../db/schemas/shop-owners";

export const getAppointmentsBySHopId = (shopId: number) => {
  return (
    db
      .select({
        appointment: appointments,
        // shop: shopOwners,
        customer: {
          id: users.id,
          username: users.username,
          email: users.email,
          phone: users.phone,
          profileImage: users.profileImage,
        },
        expert: experts,
        slot: slots,
      })
      .from(appointments)
      // .innerJoin(shopOwners, eq(appointments.shopId, shopOwners.id))
      .innerJoin(users, eq(appointments.customerId, users.id))
      .innerJoin(experts, eq(appointments.expertId, experts.id))
      .innerJoin(slots, eq(appointments.slotId, slots.id))
      .where(eq(appointments.shopId, shopId))
  );
};

export const getAppointmentByAppointmentId = (id: number) => {
  return db
    .select({
      appointment: appointments,
      customer: {
        id: users.id,
        username: users.username,
        email: users.email,
        phone: users.phone,
        profileImage: users.profileImage,
      },
      expert: experts,
      slot: slots,
    })
    .from(appointments)
    .innerJoin(users, eq(appointments.customerId, users.id))
    .innerJoin(experts, eq(appointments.expertId, experts.id))
    .innerJoin(slots, eq(appointments.slotId, slots.id))
    .where(eq(appointments.id, id));
};
