import { Request, Response } from "express";

import { eq } from "drizzle-orm";
import { db } from "../../db/setup";
import { shopOwners } from "../../db/schemas/shop-owners";

export const updateById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const {
      about,
      address,
      latitude,
      longitude,
      googleReviewUrl,
      parlourName,
      openingHours,
      placeId,
      totalRating,
    } = req.body;

    const existingShop = await db
      .select()
      .from(shopOwners)
      .where(eq(shopOwners.userId, userId))
      .limit(1);

    if (existingShop.length > 0) {
      await db
        .update(shopOwners)
        .set({
          about,
          address,
          latitude,
          longitude,
          googleReviewUrl,
          parlourName,
          openingHours,
          placeId,
          totalRating,
        })
        .where(eq(shopOwners.userId, userId));
    } else {
      await db.insert(shopOwners).values({
        userId,
        about,
        address,
        latitude,
        longitude,
        googleReviewUrl,
        parlourName,
        openingHours,
        placeId,
        totalRating,
        isOnboarded: true,
      });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
