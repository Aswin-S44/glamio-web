import { Request, Response } from "express";
import { offers } from "../../db/schemas/offers";
import { and, eq } from "drizzle-orm";
import { db } from "../../db/setup";
import { uploadImage } from "../../utils/upload";

export const addOffer = async (req: Request, res: Response): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const [existingOffer] = await db
      .select()
      .from(offers)

      .where(
        and(
          eq(offers.shopId, shopId),
          eq(offers.categoryId, req.body.categoryId)
        )
      );

    if (existingOffer) {
      res
        .status(409)
        .json({ message: "Offer already exists for this service." });
    }
    const uploadedImage: string | null = await uploadImage(req.body.image);

    if (!uploadedImage) {
      res.status(400).json({ message: "Image upload failed" });
      return;
    }

    await db.insert(offers).values({
      ...req.body,
      image: uploadImage,
      shopId,
    });

    res.status(201).json({ message: "Offer created successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
