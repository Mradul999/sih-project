import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeController = {
  // Create Payment Intent
  createPaymentIntent: async (req, res) => {
    try {
      const { price } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price, 
        currency: "INR",
      });

      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default stripeController;
