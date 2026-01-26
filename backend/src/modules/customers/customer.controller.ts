import { Request, Response } from "express";
import {
  BookingService,
  createBookingService,
  getAllExpertsByShopIdService,
  getAllShopsService,
  getShopByIdService,
} from "./customer.service";
import { SlotService } from "../slots/slot.service";
import { appointmentStatuses } from "../../constants/constants";

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

export const getExpertsByShopId = async (req: Request, res: Response) => {
  const experts = await getAllExpertsByShopIdService(Number(req.params.shopId));
  res.json({ experts });
};

export const getSlotsByShopId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopIdParam = req.params.shopId;

    if (!shopIdParam || Array.isArray(shopIdParam)) {
      res.status(400).json({ message: "Invalid shopId" });
      return;
    }

    const shopId = Number(shopIdParam);

    if (isNaN(shopId)) {
      res.status(400).json({ message: "shopId must be a number" });
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

export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shopId = Number(req.query.shop_id);
    const slotId = Number(req.query.slot_id);
    const expertId = Number(req.query.expert_id);
    const customerId = Number(req.user?.id);
    const appointmentStatus = appointmentStatuses.PENDING;
    const selectedServices = req.body.serviceIds;

    const bookingRate = await BookingService.calculateTotalRate(
      selectedServices
    );

    const dataToUpdate = {
      statusId: appointmentStatus.id,
      customerId,
      expertId,
      slotId,
      shopId,
      serviceIds: selectedServices,
      rate: bookingRate,
    };

    console.log("dataToUpdate-------------", dataToUpdate);

    const result = await createBookingService(dataToUpdate);
    res.status(201).send({ appointment: result });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
