import express from "express";
import authMiddleware from "../../middlewares/auth";
import { updateById } from "../../controllers/experts/updateById";

const router = express.Router();
router.patch("/", authMiddleware, updateById);

export default router;
