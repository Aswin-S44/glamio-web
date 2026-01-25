import { Router } from "express";
import { getAllShops, getShopById } from "./customer.controller";

const router = Router();

router.get("/shops", getAllShops);
router.get("/shop/:id", getShopById);

export default router;
