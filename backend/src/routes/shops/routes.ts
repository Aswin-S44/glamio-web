import express from "express";
import authMiddleware from "../../middlewares/auth";
import { updateById } from "../../controllers/shops/updateById";
import { createService } from "../../controllers/shops/createService";
import { getServices } from "../../controllers/shops/getServices";
import { deleteServiceById } from "../../controllers/shops/deleteServiceById";
import { updateServiceById } from "../../controllers/shops/updateServiceById";
import { getServiceById } from "../../controllers/shops/getServiceById";
import { addExpert } from "../../controllers/shops/addExpert";
import { getExperts } from "../../controllers/shops/getExperts";
import { getExpertById } from "../../controllers/shops/getExpertById";
import { deleteExpertById } from "../../controllers/shops/deleteExpertById";
import { updateExpertById } from "../../controllers/shops/updateExpertById";
import { addOffer } from "../../controllers/shops/addOffer";
import { getOffers } from "../../controllers/shops/getOffers";
import { getOfferById } from "../../controllers/shops/getOfferById";
import { deleteOfferById } from "../../controllers/shops/deleteOfferById";
import { updateOfferById } from "../../controllers/shops/updateOfferById";
import { createSlot } from "../../controllers/shops/createSlot";
import { getSlots } from "../../controllers/shops/getSlots";

const router = express.Router();
router.patch("/", authMiddleware, updateById);

// Services related routes
router.post("/service", authMiddleware, createService);
router.get("/services", authMiddleware, getServices);
router.delete("/service/:id", authMiddleware, deleteServiceById);
router.patch("/service/:id", authMiddleware, updateServiceById);
router.get("/service/:id", authMiddleware, getServiceById);

// Experts related routes
router.post("/expert", authMiddleware, addExpert);
router.get("/experts", authMiddleware, getExperts);
router.get("/expert/:id", authMiddleware, getExpertById);
router.delete("/expert/:id", authMiddleware, deleteExpertById);
router.patch("/expert/:id", authMiddleware, updateExpertById);

// Offer related routes
router.post("/offer", authMiddleware, addOffer);
router.get("/offers", authMiddleware, getOffers);
router.get("/offer/:id", authMiddleware, getOfferById);
router.delete("/offer/:id", authMiddleware, deleteOfferById);
router.patch("/offer/:id", authMiddleware, updateOfferById);

// Slots related routes
router.post("/slot", authMiddleware, createSlot);
router.get("/slots", authMiddleware, getSlots);

export default router;
