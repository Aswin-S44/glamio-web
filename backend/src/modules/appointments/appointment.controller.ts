import { Request, Response } from "express";
import {
  getAppointmentById,
  getAppointmentService,
} from "./appointment.service";
import { getShopIdByUserId } from "../slots/slot.service";

export const getAppointmetns = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const shopId = await getShopIdByUserId(userId);
  if (!shopId) return res.status(404).json({ message: "Shop not found" });

  const appointments = await getAppointmentService(shopId);
  res.json({ appointments });
};

export const getAppointmentDetailsById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const appointment = await getAppointmentById(Number(id));
  if (!appointment)
    return res.status(404).json({ message: "Appointment not found" });

  res.json({ appointment });
};
