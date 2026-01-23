import { Request, Response } from "express";
import { db } from "../../db/setup";
import { eq, and } from "drizzle-orm";
import { offers } from "../../db/schemas/offers";

export const updateOfferById = async (
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
      .select({ id: offers.id })
      .from(offers)
      .where(and(eq(offers.id, offerId), eq(offers.shopId, shopId)));

    if (!offer) {
      res.status(404).json({ message: "Offer not found" });
      return;
    }

    await db
      .update(offers)
      .set({
        ...req.body,
      })
      .where(eq(offers.id, offerId));

    res.status(200).json({ message: "Offer updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
