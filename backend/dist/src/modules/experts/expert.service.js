"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpertService = exports.updateExpertService = exports.getExpertByIdService = exports.getExpertsService = exports.addExpertService = void 0;
const expert_repository_1 = require("./expert.repository");
const upload_1 = require("../../utils/upload");
const addExpertService = async (shopId, payload) => {
    const uploadedImage = await (0, upload_1.uploadImage)(payload.image);
    if (!uploadedImage) {
        throw new Error("Image upload failed");
    }
    await (0, expert_repository_1.createExpertDB)({
        ...payload,
        image: uploadedImage,
        shopId,
    });
};
exports.addExpertService = addExpertService;
const getExpertsService = (shopId) => {
    return (0, expert_repository_1.getExpertsByShopId)(shopId);
};
exports.getExpertsService = getExpertsService;
const getExpertByIdService = async (id, shopId) => {
    const [expert] = await (0, expert_repository_1.getExpertByIdDB)(id, shopId);
    if (!expert)
        throw new Error("Expert not found");
    return expert;
};
exports.getExpertByIdService = getExpertByIdService;
const updateExpertService = async (id, shopId, data) => {
    const [expert] = await (0, expert_repository_1.getExpertByIdDB)(id, shopId);
    if (!expert)
        throw new Error("Expert not found");
    await (0, expert_repository_1.updateExpertDB)(id, data);
};
exports.updateExpertService = updateExpertService;
const deleteExpertService = async (id, shopId) => {
    const [expert] = await (0, expert_repository_1.getExpertByIdDB)(id, shopId);
    if (!expert)
        throw new Error("Expert not found");
    await (0, expert_repository_1.deleteExpertDB)(id, shopId);
};
exports.deleteExpertService = deleteExpertService;
