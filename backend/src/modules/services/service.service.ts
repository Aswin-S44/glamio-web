import {
  findCategoryByName,
  createCategory,
  createServiceDB,
  getServicesByShopId,
  findServiceByIdAndShop,
  updateServiceDB,
  deleteServiceDB,
  getServiceByIdDB,
} from "./service.repository";
import { uploadImage } from "../../utils/upload";
import { CreateServicePayload } from "./service.types";
import { and, count, eq, like } from "drizzle-orm";
import { services } from "../../db/schemas/services";
import { category } from "../../db/schemas/category";
import { db } from "../../db/setup";

export const createServiceService = async (
  shopId: number,
  payload: CreateServicePayload
) => {
  const { name, imageUrl, rate, category, description, duration } = payload;

  let categoryId: number;

  const existingCategory = await findCategoryByName(category);
  if (existingCategory) {
    categoryId = Number(existingCategory.id);
  } else {
    categoryId = await createCategory(category);
  }

  const uploadedImage = await uploadImage(imageUrl);
  if (!uploadedImage) {
    throw new Error("Image upload failed");
  }

  console.log("--------------", {
    name,
    imageUrl: uploadedImage,
    rate,
    shopId,
    categoryId,
    description,
    duration,
  });

  await createServiceDB({
    name,
    imageUrl: uploadedImage,
    rate,
    shopId,
    categoryId,
    description,
    duration,
  });
};

export const getServicesService = (
  shopId: number,
  limit: number,
  offset: number,
  search: string,
  categoryName: string
) => {
  const conditions = [eq(services.shopId, shopId)];

  if (search) {
    conditions.push(like(services.name, `%${search}%`));
  }

  if (categoryName !== "All") {
    conditions.push(eq(category.name, categoryName));
  }

  return db
    .select({
      id: services.id,
      name: services.name,
      imageUrl: services.imageUrl,
      rate: services.rate,
      shopId: services.shopId,
      categoryId: services.categoryId,
      categoryName: category.name,
      createdAt: services.createdAt,
      updatedAt: services.updatedAt,
      description: services.description,
      duration: services.duration,
    })
    .from(services)
    .leftJoin(category, eq(services.categoryId, category.id))
    .where(and(...conditions))
    .limit(limit)
    .offset(offset);
};

export const getServicesCountService = (
  shopId: number,
  search: string,
  categoryName: string
) => {
  const conditions = [eq(services.shopId, shopId)];

  if (search) {
    conditions.push(like(services.name, `%${search}%`));
  }

  if (categoryName !== "All") {
    conditions.push(eq(category.name, categoryName));
  }

  return db
    .select({ count: count() })
    .from(services)
    .leftJoin(category, eq(services.categoryId, category.id))
    .where(and(...conditions));
};

export const getServiceByIdService = async (id: number, shopId: number) => {
  const result = await getServiceByIdDB(id, shopId);
  if (!result.length) throw new Error("Service not found");
  return result[0];
};

export const updateServiceService = async (
  id: number,
  shopId: number,
  data: any
) => {
  const exists = await findServiceByIdAndShop(id, shopId);
  if (!exists.length) throw new Error("Service not found");

  await updateServiceDB(id, data);
};

export const deleteServiceService = async (id: number, shopId: number) => {
  const exists = await findServiceByIdAndShop(id, shopId);
  if (!exists.length) throw new Error("Service not found");

  await deleteServiceDB(id, shopId);
};
