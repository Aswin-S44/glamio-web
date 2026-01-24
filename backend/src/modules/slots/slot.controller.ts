import { Request, Response } from "express";
import { SlotService } from "./slot.service";

export const createSlot = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await SlotService.createSlot(shopId, req.body);

    res.status(201).json({ message: "Slot created successfully" });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSlots = async (req: Request, res: Response): Promise<void> => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const slots = await SlotService.getSlots(shopId);

    res.status(200).json({ slots });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
