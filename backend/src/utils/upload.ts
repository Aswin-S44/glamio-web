import { cloudinary } from "../config/cloudinary";

export const uploadImage = async (image: string): Promise<string | null> => {
  try {
    const response = await cloudinary.uploader.upload(image, {
      upload_preset: "cloudinary_react",
      public_id: `${Date.now()}_additional`,
    });

    return response?.secure_url ?? null;
  } catch {
    return null;
  }
};
