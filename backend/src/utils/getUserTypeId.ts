import { eq } from "drizzle-orm";
import { userTypes } from "../db/schemas/users_types";
import { db } from "../db/setup";

export async function getUserTypeId(userType: string) {
  const [type] = await db
    .select()
    .from(userTypes)
    .where(eq(userTypes.name, userType))
    .limit(1);

  console.log("type--------------", type ? type : "no type");

  if (!type) {
    throw new Error("CUSTOMER user type not found");
  }

  return type.id;
}
