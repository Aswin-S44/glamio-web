import { db } from "../../db/setup";
import { slots } from "../../db/schemas/slots";
import { and, eq } from "drizzle-orm";
import { CreateSlotDTO, SlotInsert } from "./slot.types";

export class SlotRepository {
  static findDuplicate(
    shopId: number,
    slotDate: Date,
    startTime: string,
    endTime: string
  ) {
    return db
      .select()
      .from(slots)
      .where(
        and(
          eq(slots.shopId, shopId),
          eq(slots.slotDate, slotDate),
          eq(slots.startTime, startTime),
          eq(slots.endTime, endTime)
        )
      );
  }

  static create(shopId: number, data: CreateSlotDTO) {
    const insertData: SlotInsert = {
      ...data,
      shopId,
      bookedCount: 0,
      isAvailable: true,
      isRecurring: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return db.insert(slots).values(insertData);
  }

  static findAllByShop(shopId: number) {
    return db.select().from(slots).where(eq(slots.shopId, shopId));
  }
}

export const findSlotByIdAndShop = (id: number, shopId: number) => {
  return db
    .select({ id: slots.id })
    .from(slots)
    .where(and(eq(slots.id, id), eq(slots.shopId, shopId)));
};

export const updateSlotDB = (id: number, data: any) => {
  return db.update(slots).set(data).where(eq(slots.id, id));
};

export const deleteSlotDB = (id: number) => {
  return db.delete(slots).where(eq(slots.id, id));
};
