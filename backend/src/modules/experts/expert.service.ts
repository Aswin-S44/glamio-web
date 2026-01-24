import {
  createExpertDB,
  getExpertsByShopId,
  getExpertByIdDB,
  updateExpertDB,
  deleteExpertDB,
} from "./expert.repository";
import { uploadImage } from "../../utils/upload";
import { CreateExpertPayload } from "./expert.types";

export const addExpertService = async (
  shopId: number,
  payload: CreateExpertPayload
) => {
  const uploadedImage = await uploadImage(payload.image);

  if (!uploadedImage) {
    throw new Error("Image upload failed");
  }

  await createExpertDB({
    ...payload,
    image: uploadedImage,
    shopId,
  });
};

export const getExpertsService = (shopId: number) => {
  return getExpertsByShopId(shopId);
};

export const getExpertByIdService = async (id: number, shopId: number) => {
  const [expert] = await getExpertByIdDB(id, shopId);
  if (!expert) throw new Error("Expert not found");
  return expert;
};

export const updateExpertService = async (
  id: number,
  shopId: number,
  data: any
) => {
  const [expert] = await getExpertByIdDB(id, shopId);
  if (!expert) throw new Error("Expert not found");

  await updateExpertDB(id, data);
};

export const deleteExpertService = async (id: number, shopId: number) => {
  const [expert] = await getExpertByIdDB(id, shopId);
  if (!expert) throw new Error("Expert not found");

  await deleteExpertDB(id, shopId);
};
