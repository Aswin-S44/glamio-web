"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSlotDB = exports.updateSlotDB = exports.findSlotByIdAndShop = exports.SlotRepository = void 0;
const setup_1 = require("../../db/setup");
const slots_1 = require("../../db/schemas/slots");
const drizzle_orm_1 = require("drizzle-orm");
class SlotRepository {
    static findDuplicate(shopId, slotDate, startTime, endTime) {
        return setup_1.db
            .select()
            .from(slots_1.slots)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(slots_1.slots.shopId, shopId), (0, drizzle_orm_1.eq)(slots_1.slots.slotDate, slotDate), (0, drizzle_orm_1.eq)(slots_1.slots.startTime, startTime), (0, drizzle_orm_1.eq)(slots_1.slots.endTime, endTime)));
    }
    static create(shopId, data) {
        const insertData = {
            ...data,
            shopId,
            bookedCount: 0,
            isAvailable: true,
            isRecurring: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return setup_1.db.insert(slots_1.slots).values(insertData);
    }
    static findAllByShop(shopId) {
        return setup_1.db.select().from(slots_1.slots).where((0, drizzle_orm_1.eq)(slots_1.slots.shopId, shopId));
    }
}
exports.SlotRepository = SlotRepository;
const findSlotByIdAndShop = (id, shopId) => {
    return setup_1.db
        .select({ id: slots_1.slots.id })
        .from(slots_1.slots)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(slots_1.slots.id, id), (0, drizzle_orm_1.eq)(slots_1.slots.shopId, shopId)));
};
exports.findSlotByIdAndShop = findSlotByIdAndShop;
const updateSlotDB = (id, data) => {
    return setup_1.db.update(slots_1.slots).set(data).where((0, drizzle_orm_1.eq)(slots_1.slots.id, id));
};
exports.updateSlotDB = updateSlotDB;
const deleteSlotDB = (id) => {
    return setup_1.db.delete(slots_1.slots).where((0, drizzle_orm_1.eq)(slots_1.slots.id, id));
};
exports.deleteSlotDB = deleteSlotDB;
