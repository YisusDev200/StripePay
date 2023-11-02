import express from "express";
const router = express.Router();

import { payment, success, cancel } from "../controllers/payment.controller.js";

router.post("/payment", payment);

router.get("/success", success);

router.get("/cancel", cancel);

export default router;
