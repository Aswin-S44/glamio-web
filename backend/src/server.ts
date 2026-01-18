import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import expertRouter from "./routes/expert/routes";
import customerRouter from "./routes/customer/router";
import authRouter from "./routes/auth/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expert", expertRouter);
app.use("/api/v1/customer", customerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
