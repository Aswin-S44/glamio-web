import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import admin from "../../db/firebase/index";

const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name, picture } = decodedToken;

    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.json({
      token,
      user: { uid, email, name, picture },
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid gogle token" });
  }
};

export default googleSignIn;
