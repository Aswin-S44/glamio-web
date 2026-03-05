import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getProfileById, getStats, updateProfile } from "./shop.controller";

const router = Router();

router.get("/", authMiddleware, getProfileById);

router.patch("/", authMiddleware, updateProfile);

router.get("/stats", authMiddleware, getStats);

export default router;
