import { Request, Response } from "express";
import { getAllShopsService, getShopByIdService } from "./customer.service";

export const getAllShops = async (req: Request, res: Response) => {
  const shops = await getAllShopsService();
  res.json({ shops });
};

export const getShopById = async (req: Request, res: Response) => {
  try {
    const shop = await getShopByIdService(Number(req.params.id));
    res.json(shop);
  } catch (e: any) {
    res.status(404).json({ message: e.message });
  }
};
