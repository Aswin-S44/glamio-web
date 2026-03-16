"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setup_1 = require("../../db/setup");
const shop_owners_1 = require("../../db/schemas/shop-owners");
const drizzle_orm_1 = require("drizzle-orm");
const users_1 = require("../../db/schemas/users");
const createUser = async (data) => {
    const [result] = await setup_1.db.insert(users_1.users).values({
        ...data,
        isActive: true,
        emailVerified: false,
    });
    const [newUser] = await setup_1.db
        .select()
        .from(users_1.users)
        .where((0, drizzle_orm_1.eq)(users_1.users.id, result.insertId));
    return newUser;
};
exports.createUser = createUser;
const createUserService = async (payload) => {
    const { email, username, profileImage, userType } = payload;
    const DEFAULT_CUSTOMER_ID = 1;
    const DEFAULT_SHOP_ID = 2;
    if (!email || !username) {
        throw new Error("email and username are required");
    }
    const existingUser = await setup_1.db
        .select()
        .from(users_1.users)
        .where((0, drizzle_orm_1.eq)(users_1.users.email, email))
        .limit(1);
    if (existingUser.length > 0) {
        const user = existingUser[0];
        let shopDetails = null;
        if (user.userTypeId === DEFAULT_SHOP_ID) {
            const shop = await setup_1.db
                .select()
                .from(shop_owners_1.shopOwners)
                .where((0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.userId, user.id))
                .limit(1);
            shopDetails = shop[0] || null;
        }
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        return {
            user: { ...user, shopProfile: shopDetails },
            token,
        };
    }
    const userTypeId = userType === "shop" ? DEFAULT_SHOP_ID : DEFAULT_CUSTOMER_ID;
    const newUser = await (0, exports.createUser)({
        email,
        username,
        profileImage,
        userTypeId,
    });
    let shopDataResponse = null;
    if (userTypeId === DEFAULT_SHOP_ID && newUser) {
        const shopPayload = {
            userId: newUser.id,
            about: "",
            address: "",
            latitude: "0",
            longitude: "0",
            googleReviewUrl: "",
            isOnboarded: false,
            openingHours: {},
            parlourName: "",
            placeId: "",
            totalRating: 0,
            isProfileCompleted: false,
        };
        const [shopResult] = await setup_1.db.insert(shop_owners_1.shopOwners).values(shopPayload);
        const [shopRecord] = await setup_1.db
            .select()
            .from(shop_owners_1.shopOwners)
            .where((0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.id, shopResult.insertId));
        shopDataResponse = shopRecord;
    }
    const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return {
        user: { ...newUser, shopProfile: shopDataResponse },
        token,
    };
};
exports.createUserService = createUserService;
