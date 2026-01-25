import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { getProfileById, updateProfile } from "./shop.controller";

const router = Router();

router.get("/", authMiddleware, getProfileById);

router.patch("/", authMiddleware, updateProfile);

export default router;
