import { Request, Response } from "express";
import {
  deleteSlotService,
  SlotService,
  updateSlotService,
} from "./slot.service";

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

export const updateSlotById = async (req: Request, res: Response) => {
  try {
    await updateSlotService(Number(req.params.id), req.user!.id, req.body);
    res.json({ message: "Slots updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteSlotById = async (req: Request, res: Response) => {
  try {
    const shopId = req.user?.id;

    if (!shopId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await deleteSlotService(Number(req.params.id), shopId);
    res.json({ message: "Slots deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
