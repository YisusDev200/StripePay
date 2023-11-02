import Stripe from "stripe";
import { sendEmail } from "../controllers/email.controller.js";

const { STRIPE_SECRET_KEY, PORT, EMAIL_TO } = process.env;

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
              description: "Comfortable cotton t-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Phone 15",
              description: "phone from phone company",
            },
            unit_amount: 15000,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:${PORT}/success`,
      cancel_url: `http://localhost:${PORT}/cancel`,
    });
    res.json({
      url: session.url,
      session,
    });
  } catch (error) {
    res.json({
      error: error.raw,
    });
    console.log(error);
  }
};

export const success = async (req, res) => {
  const html = `
  <html>
    <head></head>
    <body>
      <h1>Payment Confirmation</h1>
      <p>Your payment has been successfully processed.</p>
      <p>Thank you for choosing our services.</p>
      <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
    </body>
  </html>
`;
  const data = {
    to: EMAIL_TO,
    text: "Payment Confirmation",
    html,
  };
  sendEmail(data);
  res.status(200).json({
    status: true,
    message: "Email sent successfully from payments",
  });
};

export const cancel = async (req, res) => {
  res.json({
    message: "Your payment has been canceled.",
  });
};
