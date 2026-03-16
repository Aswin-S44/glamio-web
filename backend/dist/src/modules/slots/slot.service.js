"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopIdByUserId = exports.deleteSlotService = exports.updateSlotService = exports.SlotService = void 0;
const shop_repository_1 = require("../shops/shop.repository");
const slot_repository_1 = require("./slot.repository");
class SlotService {
    static async createSlot(shopId, data) {
        const { slotDate, startTime, endTime } = data;
        const existing = await slot_repository_1.SlotRepository.findDuplicate(shopId, slotDate, startTime, endTime);
        if (existing.length > 0) {
            throw new Error("Slot already exists for this time");
        }
        await slot_repository_1.SlotRepository.create(shopId, data);
    }
    static async getSlots(shopId) {
        return slot_repository_1.SlotRepository.findAllByShop(shopId);
    }
}
exports.SlotService = SlotService;
const updateSlotService = async (id, shopId, data) => {
    const exists = await (0, slot_repository_1.findSlotByIdAndShop)(id, shopId);
    if (!exists.length)
        throw new Error("Slots not found");
    await (0, slot_repository_1.updateSlotDB)(id, data);
};
exports.updateSlotService = updateSlotService;
const deleteSlotService = async (id, shopId) => {
    const exists = await (0, slot_repository_1.findSlotByIdAndShop)(id, shopId);
    if (!exists.length)
        throw new Error("Slots not found");
    await (0, slot_repository_1.deleteSlotDB)(id);
};
exports.deleteSlotService = deleteSlotService;
const getShopIdByUserId = async (userId) => {
    const shop = await (0, shop_repository_1.findShopByUserId)(userId);
    if (!shop) {
        return null;
    }
    const shopId = shop.shop?.id;
    if (!shopId) {
        return null;
    }
    return shopId;
};
exports.getShopIdByUserId = getShopIdByUserId;
