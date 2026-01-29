import jwt from "jsonwebtoken";
import {
  DEFAULT_CUSTOMER_ID,
  DEFAULT_SHOP_ID,
  usersTypes,
} from "../../constants/constants";
import { getUserTypeId } from "../../utils/getUserTypeId";
import { createUser, findUserByEmail } from "./user.repository";
import { CreateUserPayload } from "./user.types";
export const createUserService = async (payload: CreateUserPayload) => {
  const { email, username, profileImage, userType } = payload;
  if (!email || !username) {
    throw new Error("email and username are required");
  }
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    return { user: existingUser, token };
  }
  const userTypeId =
    userType === "customer"
      ? DEFAULT_CUSTOMER_ID
      : userType === "shop"
      ? DEFAULT_SHOP_ID
      : DEFAULT_CUSTOMER_ID;
  const newUser = await createUser({
    email,
    username,
    profileImage,
    userTypeId,
  });
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return { user: newUser, token };
};
