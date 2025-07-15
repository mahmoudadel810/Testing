import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
   apiVersion: '2024-12-18.acacia'
});

// Test Stripe connection
// stripe.paymentMethods.list({ limit: 1 })
//    .then(() => console.log('Connected to Stripe successfully'))
//    .catch((error) => console.error('Stripe connection error:', error.message)); 