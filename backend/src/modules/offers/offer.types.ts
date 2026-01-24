export interface CreateOfferDTO {
  categoryId: number;
  serviceId: number;
  offerPrice: number;
  regularPrice: number;
  image?: string;
  validFrom?: Date;
  validTo?: Date;
}

export interface UpdateOfferDTO {
  categoryId?: number;
  serviceId?: number;
  offerPrice?: number;
  regularPrice?: number;
  image?: string;
  validFrom?: Date;
  validTo?: Date;
}
