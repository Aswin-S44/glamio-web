import { usersTypes } from "../constants/constants";
import { appointmentStatus } from "./schemas/appointment_status";
import { userTypes } from "./schemas/users_types";
import { db } from "./setup";

async function seedUserTypes() {
  console.log("Seeding datas...");
  
  // Insert user types
  const values = Object.values(usersTypes);
  await db.insert(userTypes).values(values);

  // Insert appointment statuese
  // const appointmentStatueses = Object.values(appointmentStatus);
  // await db.insert(app).values(values);


  console.log("user_types seeded successfully");
  process.exit(0);
}

seedUserTypes().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
