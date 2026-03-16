"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopStatsRepo = exports.updateShopDB = exports.findShopByUserId = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const setup_1 = require("../../db/setup");
const users_1 = require("../../db/schemas/users");
const shop_owners_1 = require("../../db/schemas/shop-owners");
const appointments_1 = require("../../db/schemas/appointments");
const findShopByUserId = async (userId) => {
    const result = await setup_1.db
        .select({
        user: users_1.users,
        shop: shop_owners_1.shopOwners,
    })
        .from(users_1.users)
        .leftJoin(shop_owners_1.shopOwners, (0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.userId, users_1.users.id))
        .where((0, drizzle_orm_1.eq)(users_1.users.id, userId))
        .limit(1);
    return result[0] ?? null;
};
exports.findShopByUserId = findShopByUserId;
const updateShopDB = async (userId, payload) => {
    const { user, shop } = payload;
    const shopDetails = await (0, exports.findShopByUserId)(userId);
    if (!shopDetails) {
        return { message: "Shop Not found" };
    }
    const shopId = shopDetails.shop?.id;
    if (!shopId) {
        return { message: "Shop Not found" };
    }
    return setup_1.db.transaction(async (tx) => {
        if (user && Object.keys(user).length > 0) {
            await tx
                .update(users_1.users)
                .set({
                username: user.username,
                phone: user.phone,
                profileImage: user.profileImage,
                fcmToken: user.fcmToken,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(users_1.users.id, userId));
        }
        if (shop && Object.keys(shop).length > 0) {
            await tx
                .update(shop_owners_1.shopOwners)
                .set({
                about: shop.about,
                address: shop.address,
                latitude: shop.latitude,
                longitude: shop.longitude,
                googleReviewUrl: shop.googleReviewUrl,
                openingHours: shop.openingHours,
                parlourName: shop.parlourName,
                placeId: shop.placeId,
                totalRating: shop.totalRating,
                isProfileCompleted: shop.isProfileCompleted,
                isOnboarded: shop.isOnboarded,
            })
                .where((0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.id, shopId));
        }
    });
};
exports.updateShopDB = updateShopDB;
const getShopStatsRepo = async (shopId) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const [totals] = await setup_1.db
        .select({
        totalRevenue: (0, drizzle_orm_1.sum)(appointments_1.appointments.rate),
        totalAppointments: (0, drizzle_orm_1.count)(appointments_1.appointments.id),
        activeClients: (0, drizzle_orm_1.countDistinct)(appointments_1.appointments.customerId),
    })
        .from(appointments_1.appointments)
        .where((0, drizzle_orm_1.eq)(appointments_1.appointments.shopId, shopId));
    const chartData = await setup_1.db
        .select({
        date: (0, drizzle_orm_1.sql) `DATE(${appointments_1.appointments.createdAt})`,
        revenue: (0, drizzle_orm_1.sum)(appointments_1.appointments.rate),
    })
        .from(appointments_1.appointments)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(appointments_1.appointments.shopId, shopId), (0, drizzle_orm_1.gte)(appointments_1.appointments.createdAt, sevenDaysAgo)))
        .groupBy((0, drizzle_orm_1.sql) `DATE(${appointments_1.appointments.createdAt})`)
        .orderBy((0, drizzle_orm_1.sql) `DATE(${appointments_1.appointments.createdAt})`);
    return {
        totalRevenue: Number(totals?.totalRevenue || 0),
        appointments: totals?.totalAppointments || 0,
        activeClients: totals?.activeClients || 0,
        chartData: chartData.map((d) => ({
            day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(d.date)),
            revenue: Number(d.revenue || 0),
        })),
    };
};
exports.getShopStatsRepo = getShopStatsRepo;
