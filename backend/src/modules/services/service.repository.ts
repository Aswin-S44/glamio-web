import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { category } from "../../db/schemas/category";
import { eq, and, inArray } from "drizzle-orm";

export const findCategoryByName = async (name: string) => {
  const [result] = await db
    .select()
    .from(category)
    .where(eq(category.name, name))
    .limit(1);

  return result || null;
};

export const createCategory = async (name: string) => {
  const [result] = await db.insert(category).values({ name }).$returningId();

  return Number(result.id);
};

export const createServiceDB = async (data: any) => {
  return db.insert(services).values(data);
};

export const getServicesByShopId = (shopId: number) => {
  return db.select().from(services).where(eq(services.shopId, shopId));
};

export const findServiceByIdAndShop = (id: number, shopId: number) => {
  return db
    .select({ id: services.id })
    .from(services)
    .where(and(eq(services.id, id), eq(services.shopId, shopId)));
};

export const updateServiceDB = (id: number, data: any) => {
  return db.update(services).set(data).where(eq(services.id, id));
};

export const deleteServiceDB = (id: number, shopId: number) => {
  return db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.shopId, shopId)));
};

export const getServiceByIdDB = (id: number, shopId: number) => {
  return db
    .select()
    .from(services)
    .where(and(eq(services.id, id), eq(services.shopId, shopId)))
    .limit(1);
};

export const getServicesByIds = async (serviceIds: number[]) => {
  return db
    .select({
      id: services.id,
      rate: services.rate,
    })
    .from(services)
    .where(inArray(services.id, serviceIds));
};
