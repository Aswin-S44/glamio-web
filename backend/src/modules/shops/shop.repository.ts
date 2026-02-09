import { eq } from "drizzle-orm";
import { db } from "../../db/setup";
import { users } from "../../db/schemas/users";
import { shopOwners } from "../../db/schemas/shop-owners";

export const findShopByUserId = async (userId: number) => {
  const result = await db
    .select({
      user: users,
      shop: shopOwners,
    })
    .from(users)
    .leftJoin(shopOwners, eq(shopOwners.userId, users.id))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0] ?? null;
};

export const updateShopDB = async (
  userId: number,
  payload: {
    user: Partial<typeof users.$inferInsert>;
    shop: Partial<typeof shopOwners.$inferInsert>;
  }
) => {
  const { user, shop } = payload;

  const shopDetails = await findShopByUserId(userId);

  if (!shopDetails) {
    return { message: "Shop Not found" };
  }

  const shopId = shopDetails.shop?.id;

  if (!shopId) {
    return { message: "Shop Not found" };
  }

  return db.transaction(async (tx) => {
    if (user && Object.keys(user).length > 0) {
      await tx
        .update(users)
        .set({
          username: user.username,
          phone: user.phone,
          profileImage: user.profileImage,
          fcmToken: user.fcmToken,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    }

    if (shop && Object.keys(shop).length > 0) {
      console.log("************************8");
      await tx
        .update(shopOwners)
        .set({
          about: shop.about,
          address: shop.address,
          latitude: shop.latitude,
          longitude: shop.longitude,
          googleReviewUrl: shop.googleReviewUrl,
          openingHours: shop.openingHours,
          parlourName: shop.parlourName,
          placeId: shop.placeId,
          totalRating: shop.totalRating,
          isProfileCompleted: shop.isProfileCompleted,
          isOnboarded: shop.isOnboarded,
        })
        .where(eq(shopOwners.id, shopId));
    }
  });
};
