import { Request, Response } from "express";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { eq, and } from "drizzle-orm";

export const getServiceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const serviceId = Number(req.params.id);

    if (!userId || !serviceId) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    const result = await db
      .select()
      .from(services)
      .where(and(eq(services.id, serviceId), eq(services.shopId, userId)))
      .limit(1);

    if (result.length === 0) {
      res.status(404).json({ message: "Service not found or not authorized" });
      return;
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
