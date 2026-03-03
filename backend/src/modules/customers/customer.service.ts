import axios from "axios";
import { getServicesByIds } from "../services/service.repository";
import {
  createBookingDB,
  findBookingDB,
  getAllExpertsByShopIdDB,
  getAllShopsDB,
  getShopByIdDB,
} from "./customer.repository";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { category } from "../../db/schemas/category";
import { eq } from "drizzle-orm";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

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

export const findExistingBookingService = async (data: any) => {
  const result = await findBookingDB(data);
  return result[0] || null;
};

export const getSHopReviewsAndImageServices = async (placeId: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,photos&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const res = await axios.get(url);
    const result = res?.data?.result;

    if (!result) {
      return { rating: 0, reviews: [], images: [] };
    }

    const photos = result.photos || [];

    const images = photos.map(
      (p: any) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${p.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
    );

    return {
      rating: result.rating || 0,
      reviews: result.reviews || [],
      images,
    };
  } catch {
    return { rating: 0, reviews: [], images: [] };
  }
};

export const getAllServices = (limit: number, offset: number) => {
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
    .leftJoin(category, eq(services.categoryId, category.id));
  // .limit(limit)
  // .offset(offset);
};
