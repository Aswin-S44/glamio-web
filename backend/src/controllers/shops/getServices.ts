import { Request, Response } from "express";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { eq } from "drizzle-orm";

export const getServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const service = await db
      .select()
      .from(services)
      .where(eq(services.shopId, userId));

    res.status(200).json({ services: service });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
