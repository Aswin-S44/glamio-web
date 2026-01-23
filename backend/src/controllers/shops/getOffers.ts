import { Request, Response } from "express";
import { db } from "../../db/setup";
import { eq } from "drizzle-orm";
import { offers } from "../../db/schemas/offers";

export const getOffers = async (req: Request, res: Response): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const allOffers = await db
      .select()
      .from(offers)
      .where(eq(offers.shopId, shopId));

    res.status(200).json({ offers: allOffers });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
