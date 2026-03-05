import { OfferRepository } from "./offer.repository";
import { CreateOfferDTO, UpdateOfferDTO } from "./offer.types";
import { uploadImage } from "../../utils/upload";

export class OfferService {
  static async createOffer(shopId: number, data: CreateOfferDTO) {
    const existing = await OfferRepository.findByCategory(
      shopId,
      data.categoryId
    );

    if (existing.length) {
      throw new Error("Offer already exists for this category");
    }

    const imageUrl = data.image ? await uploadImage(data.image) : null;

    return OfferRepository.create(shopId, {
      ...data,
      image: imageUrl ?? undefined,
    });
  }

  static getOffers(shopId: number) {
    return OfferRepository.findAllByShop(shopId);
  }

  static async getOfferById(shopId: number, offerId: number) {
    const [offer] = await OfferRepository.findById(shopId, offerId);
    if (!offer) throw new Error("Offer not found");
    return offer;
  }

  static async updateOffer(
    shopId: number,
    offerId: number,
    data: UpdateOfferDTO
  ) {
    await this.getOfferById(shopId, offerId);
    return OfferRepository.update(shopId, offerId, data);
  }

  static async deleteOffer(shopId: number, offerId: number) {
    await this.getOfferById(shopId, offerId);
    return OfferRepository.delete(shopId, offerId);
  }
}
