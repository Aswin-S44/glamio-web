import { Router } from "express";
import {
  createBooking,
  getAllShops,
  getExpertsByShopId,
  getShopById,
  getSlotsByShopId,
} from "./customer.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.get("/shops", getAllShops);
router.get("/shop/:id", getShopById);
router.get("/experts/:shopId", getExpertsByShopId);
router.get("/slots/:shopId", getSlotsByShopId);
router.post("/booking", authMiddleware, createBooking);

export default router;
