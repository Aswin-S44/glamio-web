import { Request, Response } from "express";
import { db } from "../../db/setup";
import { eq } from "drizzle-orm";
import { experts } from "../../db/schemas/experts";

export const getExperts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const allExperts = await db
      .select()
      .from(experts)
      .where(eq(experts.shopId, shopId));

    res.status(200).json({ experts: allExperts });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
