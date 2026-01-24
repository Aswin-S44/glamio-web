import { Router } from "express";

import { OfferController } from "./offer.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/offer", authMiddleware, OfferController.addOffer);
router.get("/offers", authMiddleware, OfferController.getOffers);
router.get("/offer/:id", authMiddleware, OfferController.getOfferById);
router.patch("/offer/:id", authMiddleware, OfferController.updateOfferById);
router.delete("/offer/:id", authMiddleware, OfferController.deleteOfferById);

export default router;
