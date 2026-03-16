"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("../users/user.controller");
const setup_1 = require("../../db/setup");
const shop_owners_1 = require("../../db/schemas/shop-owners");
const drizzle_orm_1 = require("drizzle-orm");
const router = express_1.default.Router();
router.get("/me", auth_middleware_1.default, (req, res) => {
    res.json({
        user: req.user,
    });
});
router.post("/signin/google", auth_controller_1.googleSignIn);
router.post("/signup", user_controller_1.createUser);
router.get("/profile", auth_middleware_1.default, async (req, res) => {
    try {
        const user = req.user;
        const [shop] = await setup_1.db
            .select()
            .from(shop_owners_1.shopOwners)
            .where((0, drizzle_orm_1.eq)(shop_owners_1.shopOwners.userId, user.id))
            .limit(1);
        return res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            isActive: user.isActive,
            emailVerified: user.emailVerified,
            profileImage: user.profileImage,
            role: shop ? "SHOP_OWNER" : "CUSTOMER",
            shop: shop || null,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
