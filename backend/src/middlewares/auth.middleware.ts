import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db/setup";
import { users } from "../db/schemas/users";
import { eq } from "drizzle-orm";

interface JwtPayload {
  email: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

console.log("authHeader", authHeader);


    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(
      authHeader,
      process.env.JWT_SECRET as string || "add"
    ) as JwtPayload;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, decoded.email))
      .limit(1);

    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User account is disabled" });
    }

    (req as any).user = user;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
