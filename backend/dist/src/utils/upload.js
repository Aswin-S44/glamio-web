"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("../config/cloudinary");
const uploadImage = async (image) => {
    try {
        const response = await cloudinary_1.cloudinary.uploader.upload(image, {
            upload_preset: "cloudinary_react",
            public_id: `${Date.now()}_additional`,
        });
        return response?.secure_url ?? null;
    }
    catch {
        return null;
    }
};
exports.uploadImage = uploadImage;
