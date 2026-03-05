import { Request, Response } from "express";
import { findShopByUserId } from "./shop.repository";
import { getShopDashboardStats, updateShopProfile } from "./shop.service";
import { getShopIdByUserId } from "../slots/slot.service";

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
    console.log("userId : ", userId);

    await updateShopProfile(Number(userId), req.body);
    res.json({ message: "Expert updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    console.log("============");
    const userId = req.user?.id;
    console.log("user id---------", userId);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }

    const stats = await getShopDashboardStats(shopId!);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics" });
  }
};
