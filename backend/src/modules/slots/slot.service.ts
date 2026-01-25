import {
  deleteSlotDB,
  findSlotByIdAndShop,
  SlotRepository,
  updateSlotDB,
} from "./slot.repository";
import { CreateSlotDTO } from "./slot.types";

export class SlotService {
  static async createSlot(shopId: number, data: CreateSlotDTO) {
    const { slotDate, startTime, endTime } = data;

    const existing = await SlotRepository.findDuplicate(
      shopId,
      slotDate,
      startTime,
      endTime
    );

    if (existing.length > 0) {
      throw new Error("Slot already exists for this time");
    }

    await SlotRepository.create(shopId, data);
  }

  static async getSlots(shopId: number) {
    return SlotRepository.findAllByShop(shopId);
  }
}

export const updateSlotService = async (
  id: number,
  shopId: number,
  data: any
) => {
  const exists = await findSlotByIdAndShop(id, shopId);
  if (!exists.length) throw new Error("Slots not found");

  await updateSlotDB(id, data);
};

export const deleteSlotService = async (id: number, shopId: number) => {
  const exists = await findSlotByIdAndShop(id, shopId);
  if (!exists.length) throw new Error("Slots not found");

  await deleteSlotDB(id);
};
