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

export const createServiceService = async (
  shopId: number,
  payload: CreateServicePayload
) => {
  const { name, imageUrl, rate, category } = payload;

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

  await createServiceDB({
    name,
    imageUrl: uploadedImage,
    rate,
    shopId,
    categoryId,
  });
};

export const getServicesService = (shopId: number) => {
  return getServicesByShopId(shopId);
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
