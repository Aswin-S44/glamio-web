import { db } from "../../db/setup";
import { offers } from "../../db/schemas/offers";
import { and, eq } from "drizzle-orm";
import { CreateOfferDTO, UpdateOfferDTO } from "./offer.types";

export class OfferRepository {
  static findByCategory(shopId: number, categoryId: number) {
    return db
      .select()
      .from(offers)
      .where(and(eq(offers.shopId, shopId), eq(offers.categoryId, categoryId)));
  }

  static findAllByShop(shopId: number) {
    return db.select().from(offers).where(eq(offers.shopId, shopId));
  }

  static findById(shopId: number, offerId: number) {
    return db
      .select()
      .from(offers)
      .where(and(eq(offers.id, offerId), eq(offers.shopId, shopId)));
  }

  static create(shopId: number, data: CreateOfferDTO) {
    return db.insert(offers).values({ ...data, shopId });
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
