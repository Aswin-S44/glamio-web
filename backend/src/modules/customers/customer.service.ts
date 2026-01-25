import { getAllShopsDB, getShopByIdDB } from "./customer.repository";

export const getAllShopsService = () => {
  return getAllShopsDB();
};

export const getShopByIdService = async (id: number) => {
  const shop = await getShopByIdDB(id);
  if (!shop) throw new Error("Shop not found");
  return shop;
};
