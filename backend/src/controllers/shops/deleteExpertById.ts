import { Request, Response } from "express";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { eq, and } from "drizzle-orm";
import { experts } from "../../db/schemas/experts";

export const deleteExpertById = async (
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
      .select({ id: experts.id })
      .from(experts)
      .where(and(eq(experts.id, expertId), eq(services.shopId, shopId)));

    if (expert) {
      res.status(404).json({ message: "Expert not found" });
      return;
    }

    await db
      .delete(experts)
      .where(and(eq(experts.id, expertId), eq(experts.shopId, shopId)));

    res.status(200).json({ message: "Expert deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
