import jwt from "jsonwebtoken";

import { GoogleAuthResponse } from "./auth.types";
import admin from "../../config/firebase";

export const googleSignInService = async (
  idToken: string
): Promise<GoogleAuthResponse> => {
  if (!idToken) {
    throw new Error("ID token is required");
  }

  const decodedToken = await admin.auth().verifyIdToken(idToken);

  const { uid, email, name, picture } = decodedToken;

  if (!email) {
    throw new Error("Email not found in Google token");
  }

  const token = jwt.sign({ uid, email }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  return {
    token,
    user: {
      uid,
      email,
      name,
      picture,
    },
  };
};
