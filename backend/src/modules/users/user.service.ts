import jwt from "jsonwebtoken";
import { usersTypes } from "../../constants/constants";
import { getUserTypeId } from "../../utils/getUserTypeId";
import { createUser, findUserByEmail } from "./user.repository";
import { CreateUserPayload } from "./user.types";

export const createUserService = async (payload: CreateUserPayload) => {
  const { email, username, profileImage } = payload;

  if (!email || !username) {
    throw new Error("email and username are required");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

    // const userTypeId = await getUserTypeId(usersTypes.EXPERT.name);

const userTypeId = 1;

  await createUser({
    email,
    username,
    profileImage,
    userTypeId,
  });

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "add" as string, {
    expiresIn: "30d",
  });

  return { token };
};
