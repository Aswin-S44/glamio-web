import { Request, Response } from "express";

import { and, eq } from "drizzle-orm";
import { db } from "../../db/setup";
import { slots } from "../../db/schemas/slots";

export const createSlot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopId = req.user?.id;
    const { slotDate, startTime, endTime } = req.body;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const [slot] = await db
      .select()
      .from(slots)

      .where(
        and(
          eq(slots.shopId, shopId),
          eq(slots.slotDate, slotDate),
          eq(slots.startTime, startTime),
          eq(slots.endTime, endTime)
        )
      );

    if (slot) {
      res.status(409).json({ message: "Slot already exists for this time." });
    }

    await db.insert(slots).values({
      ...req.body,

      shopId,
    });

    res.status(201).json({ message: "Slots created successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
