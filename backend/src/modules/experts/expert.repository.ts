import { db } from "../../db/setup";
import { experts } from "../../db/schemas/experts";
import { eq, and } from "drizzle-orm";

export const createExpertDB = async (data: any) => {
  try {
    return await db.insert(experts).values(data);
  } catch (error: any) {
    console.error("FULL DATABASE ERROR:", error.message);
    throw error;
  }
};
export const getExpertsByShopId = (shopId: number) => {
  return db.select().from(experts).where(eq(experts.shopId, shopId));
};

export const getExpertByIdDB = (id: number, shopId: number) => {
  return db
    .select()
    .from(experts)
    .where(and(eq(experts.id, id), eq(experts.shopId, shopId)))
    .limit(1);
};

export const updateExpertDB = (id: number, data: any) => {
  return db.update(experts).set(data).where(eq(experts.id, id));
};

export const deleteExpertDB = (id: number, shopId: number) => {
  return db
    .delete(experts)
    .where(and(eq(experts.id, id), eq(experts.shopId, shopId)));
};
