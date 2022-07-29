import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(`${process.env.STRIPE_TEST_SK}`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, product } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      product: product,
    },
  });
  res.send({ clientSecret: paymentIntent.client_secret });
}
