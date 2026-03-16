"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopDashboardStats = exports.updateShopProfile = void 0;
const shop_repository_1 = require("./shop.repository");
const updateShopProfile = async (id, data) => {
    const result = await (0, shop_repository_1.findShopByUserId)(id);
    const shop = result?.shop;
    const user = result?.user;
    if (!shop || !user) {
        throw new Error("Shop not onboarded yet");
    }
    await (0, shop_repository_1.updateShopDB)(id, data);
};
exports.updateShopProfile = updateShopProfile;
const getShopDashboardStats = async (shopId) => {
    const stats = await (0, shop_repository_1.getShopStatsRepo)(shopId);
    return {
        ...stats,
        revenueGrowth: "+12.5%",
        appointmentGrowth: "+5.2%",
        clientGrowth: "+18 new today",
    };
};
exports.getShopDashboardStats = getShopDashboardStats;
