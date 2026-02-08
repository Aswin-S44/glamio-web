import { eq } from "drizzle-orm";
import { users } from "../../db/schemas/users";
import { db } from "../../db/setup";

export const findUserByEmail = async (email: string) => {
  const result = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0] || null; 
};

export const createUser = async (data: {
  email: string;
  username: string;
  profileImage?: string;
  userTypeId: number;
}) => {

console.log("data", data);


  return db
    .insert(users)
    .values({
      ...data,
      isActive: true,
      emailVerified: false,
    })
    .$returningId();
};
