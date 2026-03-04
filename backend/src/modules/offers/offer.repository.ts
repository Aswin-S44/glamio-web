import { db } from "../../db/setup";
import { offers } from "../../db/schemas/offers";
import { and, eq } from "drizzle-orm";
import { CreateOfferDTO, UpdateOfferDTO } from "./offer.types";
import { services } from "../../db/schemas/services";

export class OfferRepository {
  static findByCategory(shopId: number, categoryId: number) {
    return db
      .select()
      .from(offers)
      .where(and(eq(offers.shopId, shopId), eq(offers.categoryId, categoryId)));
  }

  static findAllByShop(shopId: number) {
    return db
      .select({
        id: offers.id,
        offerPrice: offers.offerPrice,
        regularPrice: offers.regularPrice,
        createdAt: offers.createdAt,
        updatedAt: offers.updatedAt,
        // Include service details here
        service: {
          id: services.id,
          name: services.name,
          imageUrl: services.imageUrl,
          description: services.description,
          duration: services.duration,
        },
      })
      .from(offers)
      .innerJoin(services, eq(offers.serviceId, services.id)) // Join condition
      .where(eq(offers.shopId, shopId));
  }

  static findById(shopId: number, offerId: number) {
    return db
      .select()
      .from(offers)
      .where(and(eq(offers.id, offerId), eq(offers.shopId, shopId)));
  }

  static create(shopId: number, data: CreateOfferDTO) {
    const { categoryId, offerPrice, regularPrice, serviceId } = data;
    return db
      .insert(offers)
      .values({ categoryId, offerPrice, regularPrice, serviceId, shopId });
  }

  static update(shopId: number, offerId: number, data: UpdateOfferDTO) {
    return db
      .update(offers)
      .set(data)
      .where(and(eq(offers.id, offerId), eq(offers.shopId, shopId)));
  }

  static delete(shopId: number, offerId: number) {
    return db
      .delete(offers)
      .where(and(eq(offers.id, offerId), eq(offers.shopId, shopId)));
  }
}
