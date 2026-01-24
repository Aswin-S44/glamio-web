import { Router } from "express";

import { createSlot, getSlots } from "./slot.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createSlot);
router.get("/", authMiddleware, getSlots);

export default router;
