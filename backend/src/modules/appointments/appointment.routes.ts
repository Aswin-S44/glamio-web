import { Router } from "express";
import {
  getAppointmentDetailsById,
  getAppointmetns,
} from "./appointment.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router(); 

router.get("/", authMiddleware, getAppointmetns);
router.get("/:id", authMiddleware, getAppointmentDetailsById);

export default router;
