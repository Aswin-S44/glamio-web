"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllServices = exports.getSHopReviewsAndImageServices = exports.findExistingBookingService = exports.createBookingService = exports.BookingService = exports.getAllExpertsByShopIdService = exports.getShopByIdService = exports.getAllShopsService = void 0;
const axios_1 = __importDefault(require("axios"));
const service_repository_1 = require("../services/service.repository");
const customer_repository_1 = require("./customer.repository");
const setup_1 = require("../../db/setup");
const services_1 = require("../../db/schemas/services");
const category_1 = require("../../db/schemas/category");
const drizzle_orm_1 = require("drizzle-orm");
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const getAllShopsService = () => {
    return (0, customer_repository_1.getAllShopsDB)();
};
exports.getAllShopsService = getAllShopsService;
const getShopByIdService = async (id) => {
    const shop = await (0, customer_repository_1.getShopByIdDB)(id);
    if (!shop)
        throw new Error("Shop not found");
    return shop;
};
exports.getShopByIdService = getShopByIdService;
const getAllExpertsByShopIdService = (shopId) => {
    return (0, customer_repository_1.getAllExpertsByShopIdDB)(shopId);
};
exports.getAllExpertsByShopIdService = getAllExpertsByShopIdService;
class BookingService {
    static async calculateTotalRate(serviceIds) {
        const serviceList = await (0, service_repository_1.getServicesByIds)(serviceIds);
        if (serviceList.length !== serviceIds.length) {
            throw new Error("One or more services not found");
        }
        return serviceList.reduce((sum, service) => sum + service.rate, 0);
    }
}
exports.BookingService = BookingService;
const createBookingService = (data) => {
    return (0, customer_repository_1.createBookingDB)(data);
};
exports.createBookingService = createBookingService;
const findExistingBookingService = async (data) => {
    const result = await (0, customer_repository_1.findBookingDB)(data);
    return result[0] || null;
};
exports.findExistingBookingService = findExistingBookingService;
const getSHopReviewsAndImageServices = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,photos&key=${GOOGLE_MAPS_API_KEY}`;
    try {
        const res = await axios_1.default.get(url);
        const result = res?.data?.result;
        if (!result) {
            return { rating: 0, reviews: [], images: [] };
        }
        const photos = result.photos || [];
        const images = photos.map((p) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${p.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`);
        return {
            rating: result.rating || 0,
            reviews: result.reviews || [],
            images,
        };
    }
    catch {
        return { rating: 0, reviews: [], images: [] };
    }
};
exports.getSHopReviewsAndImageServices = getSHopReviewsAndImageServices;
const getAllServices = (limit, offset) => {
    return setup_1.db
        .select({
        id: services_1.services.id,
        name: services_1.services.name,
        imageUrl: services_1.services.imageUrl,
        rate: services_1.services.rate,
        shopId: services_1.services.shopId,
        categoryId: services_1.services.categoryId,
        categoryName: category_1.category.name,
        createdAt: services_1.services.createdAt,
        updatedAt: services_1.services.updatedAt,
        description: services_1.services.description,
        duration: services_1.services.duration,
    })
        .from(services_1.services)
        .leftJoin(category_1.category, (0, drizzle_orm_1.eq)(services_1.services.categoryId, category_1.category.id));
    // .limit(limit)
    // .offset(offset);
};
exports.getAllServices = getAllServices;
