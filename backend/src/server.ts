import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/users/user.routes";
import serviceRouter from "./modules/services/service.routes";
import expertRouter from "./modules/experts/expert.routes";
import offerRouter from "./modules/offers/offer.routes";
import slotRouter from "./modules/slots/slot.routes";
import appointmentRouter from "./modules/appointments/appointment.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/expert", expertRouter);
app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/slots", slotRouter);
app.use("/api/v1/appointments", appointmentRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
