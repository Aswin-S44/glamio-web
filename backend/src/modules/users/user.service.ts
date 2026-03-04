import jwt from "jsonwebtoken";
import {
  DEFAULT_CUSTOMER_ID,
  DEFAULT_SHOP_ID,
  usersTypes,
} from "../../constants/constants";
import { getUserTypeId } from "../../utils/getUserTypeId";
import { findUserByEmail } from "./user.repository";
import { CreateUserPayload } from "./user.types";
import { db } from "../../db/setup";
import { shopOwners } from "../../db/schemas/shop-owners";
import { eq } from "drizzle-orm";
import { users } from "../../db/schemas/users";

export const createUser = async (data: {
  email: string;
  username: string;
  profileImage?: string;
  userTypeId: number;
}) => {
  const [result] = await db.insert(users).values({
    ...data,
    isActive: true,
    emailVerified: false,
  });

  const [newUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, result.insertId));

  return newUser;
};

export const createUserService = async (payload: any) => {
  console.log(payload);
  const { email, username, profileImage, userType } = payload;
  const DEFAULT_CUSTOMER_ID = 1;
  const DEFAULT_SHOP_ID = 2;

  if (!email || !username) {
    throw new Error("email and username are required");
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    const user = existingUser[0];
    let shopDetails = null;

    if (user.userTypeId === DEFAULT_SHOP_ID) {
      const shop = await db
        .select()
        .from(shopOwners)
        .where(eq(shopOwners.userId, user.id))
        .limit(1);
      shopDetails = shop[0] || null;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    return {
      user: { ...user, shopProfile: shopDetails },
      token,
    };
  }

  const userTypeId =
    userType === "shop" ? DEFAULT_SHOP_ID : DEFAULT_CUSTOMER_ID;

  const newUser = await createUser({
    email,
    username,
    profileImage,
    userTypeId,
  });

  let shopDataResponse = null;

  if (userTypeId === DEFAULT_SHOP_ID && newUser) {
    const shopPayload = {
      userId: newUser.id,
      about: "",
      address: "",
      latitude: "0",
      longitude: "0",
      googleReviewUrl: "",
      isOnboarded: false,
      openingHours: {},
      parlourName: "",
      placeId: "",
      totalRating: 0,
      isProfileCompleted: false,
    };

    const [shopResult] = await db.insert(shopOwners).values(shopPayload);

    const [shopRecord] = await db
      .select()
      .from(shopOwners)
      .where(eq(shopOwners.id, shopResult.insertId));

    shopDataResponse = shopRecord;
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  return {
    user: { ...newUser, shopProfile: shopDataResponse },
    token,
  };
};
