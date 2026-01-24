import { Request, Response } from "express";
import {
  addExpertService,
  getExpertsService,
  getExpertByIdService,
  updateExpertService,
  deleteExpertService,
} from "./expert.service";

export const addExpert = async (req: Request, res: Response) => {
  try {
    await addExpertService(req.user!.id, req.body);
    res.status(201).json({ message: "Expert created successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getExperts = async (req: Request, res: Response) => {
  const experts = await getExpertsService(req.user!.id);
  res.json({ experts });
};

export const getExpertById = async (req: Request, res: Response) => {
  try {
    const expert = await getExpertByIdService(
      Number(req.params.id),
      req.user!.id
    );
    res.json(expert);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const updateExpertById = async (req: Request, res: Response) => {
  try {
    await updateExpertService(Number(req.params.id), req.user!.id, req.body);
    res.json({ message: "Expert updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteExpertById = async (req: Request, res: Response) => {
  try {
    await deleteExpertService(Number(req.params.id), req.user!.id);
    res.json({ message: "Expert deleted successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
