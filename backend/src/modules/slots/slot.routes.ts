import { Router } from "express";

import {
  createSlot,
  deleteSlotById,
  getSlots,
  updateSlotById,
} from "./slot.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createSlot);
router.get("/", authMiddleware, getSlots);
router.patch("/:id", authMiddleware, updateSlotById);
router.delete("/:id", authMiddleware, deleteSlotById);

export default router;
