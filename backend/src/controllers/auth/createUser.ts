import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/setup";
import { users } from "../../db/schemas/users";
import { eq } from "drizzle-orm";
import { getUserTypeId } from "../../utils/getUserTypeId";
import { usersTypes } from "../../constants/constants";

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, profileImage } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        message: "email and username are required",
      });
    }

    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const userTypeId = await getUserTypeId(usersTypes.EXPERT.name);

    await db.insert(users).values({
      email,
      username,
      profileImage,
      userTypeId,
      isActive: true,
      emailVerified: false,
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default createUser;
