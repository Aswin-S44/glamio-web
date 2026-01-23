import { Request, Response } from "express";
import { uploadImage } from "../../utils/upload";
import { db } from "../../db/setup";
import { experts } from "../../db/schemas/experts";

export const addExpert = async (req: Request, res: Response): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const uploadedImage: string | null = await uploadImage(req.body.image);

    if (!uploadedImage) {
      res.status(400).json({ message: "Image upload failed" });
      return;
    }

    await db.insert(experts).values({ ...req.body, image: uploadedImage });

    res.status(201).json({ message: "expert created successfully" });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
