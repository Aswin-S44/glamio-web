import { Router } from "express";

import { OfferController } from "./offer.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, OfferController.addOffer); 
router.get("/", authMiddleware, OfferController.getOffers);
router.get("/:id", authMiddleware, OfferController.getOfferById);
router.patch("/:id", authMiddleware, OfferController.updateOfferById);
router.delete("/:id", authMiddleware, OfferController.deleteOfferById);

export default router;
