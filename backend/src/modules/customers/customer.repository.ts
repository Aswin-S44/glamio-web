import { eq } from "drizzle-orm";
import { shopOwners } from "../../db/schemas/shop-owners";
import { users } from "../../db/schemas/users";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { offers } from "../../db/schemas/offers";

export const getAllShopsDB = async () => {
  const result = await db
    .select({
      user: users,
      shop: shopOwners,
    })
    .from(users)
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
