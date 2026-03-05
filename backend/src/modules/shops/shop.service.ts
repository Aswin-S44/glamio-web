import {
  findShopByUserId,
  getShopStatsRepo,
  updateShopDB,
} from "./shop.repository";

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

export const getShopDashboardStats = async (shopId: number) => {
  const stats = await getShopStatsRepo(shopId);

  return {
    ...stats,
    revenueGrowth: "+12.5%",
    appointmentGrowth: "+5.2%",
    clientGrowth: "+18 new today",
  };
};
