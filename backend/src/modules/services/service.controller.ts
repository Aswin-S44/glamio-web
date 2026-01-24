import { Request, Response } from "express";
import {
  createServiceService,
  getServicesService,
  getServiceByIdService,
  updateServiceService,
  deleteServiceService,
} from "./service.service";

export const createService = async (req: Request, res: Response) => {
  try {
    await createServiceService(req.user!.id, req.body);
    res.status(201).json({ message: "Service created successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getServices = async (req: Request, res: Response) => {
  const services = await getServicesService(req.user!.id);
  res.json({ services });
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await getServiceByIdService(
      Number(req.params.id),
      req.user!.id
    );
    res.json(service);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const updateServiceById = async (req: Request, res: Response) => {
  try {
    await updateServiceService(Number(req.params.id), req.user!.id, req.body);
    res.json({ message: "Service updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteServiceById = async (req: Request, res: Response) => {
  try {
    await deleteServiceService(Number(req.params.id), req.user!.id);
    res.json({ message: "Service deleted successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
