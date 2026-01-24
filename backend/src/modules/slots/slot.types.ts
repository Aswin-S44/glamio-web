import { InferInsertModel } from "drizzle-orm";
import { slots } from "../../db/schemas/slots";

export type SlotInsert = InferInsertModel<typeof slots>;

export interface CreateSlotDTO {
  slotDate: Date;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  isRecurring?: boolean;
}
