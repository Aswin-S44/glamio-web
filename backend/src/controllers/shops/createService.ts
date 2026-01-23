import { Request, Response } from "express";
import { db } from "../../db/setup";
import { category } from "../../db/schemas/category";
import { services } from "../../db/schemas/services";
import { eq } from "drizzle-orm";
import { uploadImage } from "../../utils/upload";

export const createService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, imageUrl, rate, category: categoryName } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let categoryId: number;

    const [existingCategory] = await db
      .select()
      .from(category)
      .where(eq(category.name, categoryName))
      .limit(1);

    if (existingCategory) {
      categoryId = Number(existingCategory.id);
    } else {
      const [createdCategory] = await db
        .insert(category)
        .values({ name: categoryName })
        .$returningId();

      categoryId = Number(createdCategory.id);
    }

    const uploadedImage: string | null = await uploadImage(imageUrl);

    if (!uploadedImage) {
      res.status(400).json({ message: "Image upload failed" });
      return;
    }

    await db.insert(services).values({
      name: String(name),
      imageUrl: uploadedImage,
      rate: Number(rate),
      shopId: userId,
      categoryId,
    });

    res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
