"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBookingDB = exports.createBookingDB = exports.getAllExpertsByShopIdDB = exports.getShopByIdDB = exports.getAllShopsDB = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const shop_owners_1 = require("../../db/schemas/shop-owners");
const users_1 = require("../../db/schemas/users");
const setup_1 = require("../../db/setup");
const services_1 = require("../../db/schemas/services");
const offers_1 = require("../../db/schemas/offers");
const experts_1 = require("../../db/schemas/experts");
const appointments_1 = require("../../db/schemas/appointments");
const constants_1 = require("../../constants/constants");
const getAllShopsDB = async () => {
    const result = await setup_1.db
        .select({
        user: users_1.users,
        shop: shop_owners_1.shopOwners,
    })
        .from(users_1.users)
        .where((0, drizzle_orm_1.eq)(users_1.users.userTypeId, constants_1.DEFAULT_SHOP_ID))
        .leftJoin(shop_owners_1.shopOwners, (0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.userId, users_1.users.id));
    return result ?? [];
};
exports.getAllShopsDB = getAllShopsDB;
const getShopByIdDB = async (id) => {
    const rows = await setup_1.db
        .select({
        user: users_1.users,
        shop: shop_owners_1.shopOwners,
        service: services_1.services,
        offer: offers_1.offers,
    })
        .from(users_1.users)
        .leftJoin(shop_owners_1.shopOwners, (0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.userId, users_1.users.id))
        .leftJoin(services_1.services, (0, drizzle_orm_1.eq)(services_1.services.shopId, shop_owners_1.shopOwners.id))
        .leftJoin(offers_1.offers, (0, drizzle_orm_1.eq)(offers_1.offers.shopId, shop_owners_1.shopOwners.id))
        .where((0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.id, id));
    if (!rows.length)
        return null;
    const { user, shop } = rows[0];
    return {
        user,
        shop,
        services: rows.map((r) => r.service).filter(Boolean),
        offers: rows.map((r) => r.offer).filter(Boolean),
    };
};
exports.getShopByIdDB = getShopByIdDB;
const getAllExpertsByShopIdDB = async (shopId) => {
    const result = await setup_1.db
        .select()
        .from(experts_1.experts)
        .where((0, drizzle_orm_1.eq)(experts_1.experts.shopId, shopId));
    return result ?? [];
};
exports.getAllExpertsByShopIdDB = getAllExpertsByShopIdDB;
const createBookingDB = (data) => {
    return setup_1.db.insert(appointments_1.appointments).values(data);
};
exports.createBookingDB = createBookingDB;
const findBookingDB = (data) => {
    return setup_1.db
        .select()
        .from(appointments_1.appointments)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(appointments_1.appointments.shopId, data.shopId), (0, drizzle_orm_1.eq)(appointments_1.appointments.statusId, data.statusId), (0, drizzle_orm_1.eq)(appointments_1.appointments.customerId, data.customerId), (0, drizzle_orm_1.eq)(appointments_1.appointments.expertId, data.expertId), (0, drizzle_orm_1.eq)(appointments_1.appointments.slotId, data.slotId)
    // sql`${appointments.serviceIds} = ${data.serviceIds}`
    ))
        .limit(1);
};
exports.findBookingDB = findBookingDB;
