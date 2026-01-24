import { Request, Response } from "express";
import { googleSignInService } from "./auth.service";

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    const result = await googleSignInService(idToken);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Invalid Google token",
    });
  }
};
