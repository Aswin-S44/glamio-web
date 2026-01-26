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

  let token = null;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const userTypeId =
    userType === "customer"
      ? DEFAULT_CUSTOMER_ID
      : userType === "shop"
      ? DEFAULT_SHOP_ID
      : DEFAULT_CUSTOMER_ID;

  await createUser({
    email,
    username,
    profileImage,
    userTypeId,
  });

  token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  return { token };
};
