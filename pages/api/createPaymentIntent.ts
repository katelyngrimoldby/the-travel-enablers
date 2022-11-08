import type { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(`${process.env.STRIPE_SK}`);

const createPlanIntents = async (
  arr: number[],
  product: string,
  customer: { id: string }
) => {
  return;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { deposit, amounts, product, customerData } = req.body;

  const customer = await stripe.customers.create({
    name: customerData.name,
    email: customerData.email,
  });

  const depositIntent = await stripe.paymentIntents.create({
    amount: deposit,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    receipt_email: customerData.email,
    metadata: {
      product: product,
    },
    customer: customer.id,
    setup_future_usage: "off_session",
  });

  let planSecrets: string[] = [];

  for (const amount of amounts) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: customerData.email,
      metadata: {
        product: product,
      },
      customer: customer.id,
      setup_future_usage: "off_session",
    });

    planSecrets.push(paymentIntent.client_secret);
  }
  res.send({
    depositSecret: depositIntent.client_secret,
    planSecrets: planSecrets,
  });
}
