import { Request, Response } from "express";
import {
  getAppointmentById,
  getAppointmentService,
} from "./appointment.service";

export const getAppointmetns = async (req: Request, res: Response) => {
  const appointments = await getAppointmentService(req.user!.id);
  res.json({ appointments });
};

export const getAppointmentDetailsById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const appointment = await getAppointmentById(Number(id));
  res.json({ appointment });
};
