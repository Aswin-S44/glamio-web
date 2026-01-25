import { Request, Response } from "express";
import { googleSignInService } from "./auth.service";
import { createUserService } from "../users/user.service";
import { DEFAULT_IMAGE_URL } from "../../constants/urls";

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { idToken, userType } = req.body;

    const result = await googleSignInService(idToken);

    // if (result && result.user) {
    //   let userData = {
    //     email: result.user.email ?? "",
    //     username: result.user.name ?? "",
    //     profileImage: result.user.picture ?? DEFAULT_IMAGE_URL,
    //     userType,
    //   };
    //   await createUserService(userData);
    // }

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
