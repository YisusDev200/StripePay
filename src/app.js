import express from "express";
import "dotenv/config";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();
app.use(express.json());
app.use("/", paymentRoutes);

export default app;
