import { Request, Response } from "express";
import { db } from "../../db/setup";
import { eq, and } from "drizzle-orm";
import { experts } from "../../db/schemas/experts";

export const getExpertById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopId = req.user?.id;
    const expertId = Number(req.params.id);

    if (!shopId || !expertId) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    const [expert] = await db
      .select()
      .from(experts)
      .where(and(eq(experts.shopId, shopId), eq(experts.id, expertId)))
      .limit(1);

    if (!expert) {
      res.status(404).json({ message: "Expert not found " });
      return;
    }

    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
