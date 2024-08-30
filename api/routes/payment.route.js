import express from "express";
import stripeController from "../controllers/payment.controller.js";

const router = express.Router();

// Use the specific method from the controller
router.post("/create-payment-intent", stripeController.createPaymentIntent);

export default router;
