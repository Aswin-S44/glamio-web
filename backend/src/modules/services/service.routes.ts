import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  createService,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
} from "./service.controller";

const router = Router();

router.post("/", authMiddleware, createService);
router.get("/", authMiddleware, getServices);
router.get("/:id", authMiddleware, getServiceById);
router.patch("/:id", authMiddleware, updateServiceById);
router.delete("/:id", authMiddleware, deleteServiceById);

export default router;