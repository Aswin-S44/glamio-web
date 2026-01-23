import { Request, Response } from "express";
import { db } from "../../db/setup";
import { services } from "../../db/schemas/services";
import { eq, and } from "drizzle-orm";

export const updateServiceById = async (
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

    const { name, imageUrl, rate, categoryId } = req.body;

    const existing = await db
      .select({ id: services.id })
      .from(services)
      .where(and(eq(services.id, serviceId), eq(services.shopId, userId)));

    if (existing.length === 0) {
      res.status(404).json({ message: "Service not found or not authorized" });
      return;
    }

    await db
      .update(services)
      .set({
        ...(name !== undefined && { name }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(rate !== undefined && { rate }),
        ...(categoryId !== undefined && { categoryId }),
      })
      .where(eq(services.id, serviceId));

    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
