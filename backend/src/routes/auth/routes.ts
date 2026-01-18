import express, { Request, Response } from "express";
import googleSignIn from "../../controllers/customers/login";
import createUser from "../../controllers/auth/createUser";
import authMiddleware from "../../middlewares/auth";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});
router.post("/signin/google", googleSignIn);
router.post("/signup", createUser);

export default router;
