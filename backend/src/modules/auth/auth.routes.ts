import express from "express";

import authMiddleware from "../../middlewares/auth.middleware";
import { googleSignIn } from "./auth.controller";
import { createUser } from "../users/user.controller";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});
router.post("/signin/google", googleSignIn);
router.post("/signup", createUser); 

export default router;
