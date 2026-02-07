import { Request, Response } from "express";
import {
  createServiceService,
  getServicesService,
  getServiceByIdService,
  updateServiceService,
  deleteServiceService,
  getServicesCountService,
} from "./service.service";
import { getShopIdByUserId } from "../slots/slot.service";

export const createService = async (req: Request, res: Response) => {
  try {
    console.log("------------");
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);
    console.log("shopId-----------", shopId);
    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }

    await createServiceService(shopId!, req.body);
    res.status(201).json({ message: "Service created successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const getServices = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 8;
  const search = (req.query.search as string) || "";
  const categoryName = (req.query.category as string) || "All";

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const shopId = await getShopIdByUserId(userId);
  if (!shopId) return res.status(404).json({ message: "Shop not found" });

  const offset = (page - 1) * limit;

  const [services, totalCountResult] = await Promise.all([
    getServicesService(shopId, limit, offset, search, categoryName),
    getServicesCountService(shopId, search, categoryName),
  ]);

  const totalCount = totalCountResult[0].count;

  res.json({
    services,
    pagination: {
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
    },
  });
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }
    const service = await getServiceByIdService(Number(req.params.id), shopId!);
    res.json(service);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};

export const updateServiceById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }

    await updateServiceService(Number(req.params.id), shopId!, req.body);
    res.json({ message: "Service updated successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteServiceById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const shopId = await getShopIdByUserId(userId!);

    if (!shopId) {
      res.status(401).json({ message: "Shop not found" });
    }
    await deleteServiceService(Number(req.params.id), shopId!);
    res.json({ message: "Service deleted successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
