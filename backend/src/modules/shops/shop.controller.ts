import { Request, Response } from "express";
import { findShopByUserId } from "./shop.repository";
import { updateShopProfile } from "./shop.service";

export const getProfileById = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = Number(req.user.id);

    const service = await findShopByUserId(userId);

    if (!service) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(service);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user?.id;
    await updateShopProfile(Number(userId), req.body);
    res.json({ message: "Expert updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
