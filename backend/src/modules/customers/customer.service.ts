import { getServicesByIds } from "../services/service.repository";
import {
  createBookingDB,
  getAllExpertsByShopIdDB,
  getAllShopsDB,
  getShopByIdDB,
} from "./customer.repository";

export const getAllShopsService = () => {
  return getAllShopsDB();
};

export const getShopByIdService = async (id: number) => {
  const shop = await getShopByIdDB(id);
  if (!shop) throw new Error("Shop not found");
  return shop;
};

export const getAllExpertsByShopIdService = (shopId: number) => {
  return getAllExpertsByShopIdDB(shopId);
};

export class BookingService {
  static async calculateTotalRate(serviceIds: number[]) {
    const serviceList = await getServicesByIds(serviceIds);

    if (serviceList.length !== serviceIds.length) {
      throw new Error("One or more services not found");
    }

    return serviceList.reduce((sum, service) => sum + service.rate, 0);
  }
}

export const createBookingService = (data: any) => {
  return createBookingDB(data);
};
