import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  addExpert,
  getExperts,
  getExpertById,
  updateExpertById,
  deleteExpertById,
} from "./expert.controller";

const router = Router();

router.post("/", authMiddleware, addExpert);
router.get("/", authMiddleware, getExperts);
router.get("/:id", authMiddleware, getExpertById);
router.patch("/:id", authMiddleware, updateExpertById);
router.delete("/:id", authMiddleware, deleteExpertById);

export default router;
