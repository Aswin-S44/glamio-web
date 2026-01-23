import { Request, Response } from "express";
import { db } from "../../db/setup";
import { offers } from "../../db/schemas/offers";
import { and, eq } from "drizzle-orm";

export const getOfferById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopId = req.user?.id;
    const offerId = Number(req.params.id);

    if (!shopId || !offerId) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    const [offer] = await db
      .select()
      .from(offers)
      .where(and(eq(offers.id, offerId), eq(offers.shopId, shopId)));

    if (offer) {
      res.status(404).json({ message: "Offer not found" });
      return;
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
