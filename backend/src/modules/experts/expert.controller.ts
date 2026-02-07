import { Request, Response } from "express";
import {
  addExpertService,
  getExpertsService,
  getExpertByIdService,
  updateExpertService,
  deleteExpertService,
} from "./expert.service";
import { getShopIdByUserId } from "../slots/slot.service";

export const addExpert = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }

    await addExpertService(shopId!, req.body);

    res.status(201).json({ message: "Expert created successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getExperts = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const shopId = await getShopIdByUserId(userId!);

  if (!shopId) {
    res.status(401).json({ message: "Shop not found" });
  }
  const experts = await getExpertsService(shopId!);
  res.json({ experts });
};

export const getExpertById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }

    const expert = await getExpertByIdService(Number(req.params.id), shopId!);
    res.json(expert);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const updateExpertById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }
    await updateExpertService(Number(req.params.id), shopId!, req.body);
    res.json({ message: "Expert updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteExpertById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }
    await deleteExpertService(Number(req.params.id), shopId!);
    res.json({ message: "Expert deleted successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
