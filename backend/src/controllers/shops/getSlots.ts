import { Request, Response } from "express";
import { db } from "../../db/setup";
import { eq } from "drizzle-orm";
import { slots } from "../../db/schemas/slots";

export const getSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const allSlots = await db
      .select()
      .from(slots)
      .where(eq(slots.shopId, shopId));

    res.status(200).json({ slots: allSlots });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
