import { findShopByUserId, updateShopDB } from "./shop.repository";

export const updateShopProfile = async (id: number, data: any) => {
  const result = await findShopByUserId(id);

  const shop = result?.shop;
  const user = result?.user;

  if (!shop || !user) {
    throw new Error("Shop not onboarded yet");
  }
  console.log("data : ", data);
  await updateShopDB(id, data);
};
