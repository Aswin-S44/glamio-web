import { and, eq, sql } from "drizzle-orm";
import { shopOwners } from "../../db/schemas/shop-owners";
import { users } from "../../db/schemas/users";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { offers } from "../../db/schemas/offers";
import { experts } from "../../db/schemas/experts";
import { appointments } from "../../db/schemas/appointments";
import { DEFAULT_SHOP_ID } from "../../constants/constants";

export const getAllShopsDB = async () => {
  const result = await db
    .select({
      user: users,
      shop: shopOwners,
    })
    .from(users)
    .where(eq(users.userTypeId, DEFAULT_SHOP_ID))
    .leftJoin(shopOwners, eq(shopOwners.userId, users.id));

  return result ?? [];
};
export const getShopByIdDB = async (id: number) => {
  const rows = await db
    .select({
      user: users,
      shop: shopOwners,
      service: services,
      offer: offers,
    })
    .from(users)
    .leftJoin(shopOwners, eq(shopOwners.userId, users.id))
    .leftJoin(services, eq(services.shopId, shopOwners.id))
    .leftJoin(offers, eq(offers.shopId, shopOwners.id))
    .where(eq(shopOwners.id, id));

  if (!rows.length) return null;

  const { user, shop } = rows[0];

  return {
    user,
    shop,
    services: rows.map((r) => r.service).filter(Boolean),
    offers: rows.map((r) => r.offer).filter(Boolean),
  };
};

export const getAllExpertsByShopIdDB = async (shopId: number) => {
  const result = await db
    .select()
    .from(experts)
    .where(eq(experts.shopId, shopId));

  return result ?? [];
};

export const createBookingDB = (data: any) => {
  return db.insert(appointments).values(data);
};

export const findBookingDB = (data: any) => {
  console.log("data-------------", data);
  return db
    .select()
    .from(appointments)
    .where(
      and(
        eq(appointments.shopId, data.shopId),
        eq(appointments.statusId, data.statusId),
        eq(appointments.customerId, data.customerId),
        eq(appointments.expertId, data.expertId),
        eq(appointments.slotId, data.slotId)
        // sql`${appointments.serviceIds} = ${data.serviceIds}`
      )
    )
    .limit(1);
};
