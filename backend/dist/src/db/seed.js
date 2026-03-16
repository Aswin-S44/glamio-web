"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants/constants");
const appointment_status_1 = require("./schemas/appointment_status");
const users_types_1 = require("./schemas/users_types");
const setup_1 = require("./setup");
async function seedUserTypes() {
    console.log("Seeding datas...");
    // Insert user types
    const values = Object.values(constants_1.usersTypes);
    await setup_1.db.insert(users_types_1.userTypes).values(values);
    // Insert appointment statuese
    const appointmentStatueses = Object.values(constants_1.appointmentStatuses);
    await setup_1.db.insert(appointment_status_1.appointmentStatus).values(appointmentStatueses);
    console.log("Seeding completed ....");
    process.exit(0);
}
seedUserTypes().catch((err) => {
    console.error("Seeding failed", err);
    process.exit(1);
});
