import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import styles from "../styles/purchaseCompleted.module.scss";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PK}`);

const PurchaseCompleted: NextPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!stripePromise) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) {
      stripePromise.then(async (stripe) => {
        if (stripe) {
          const paymentIntent = await stripe.retrievePaymentIntent(
            clientSecret
          );
          if (paymentIntent.paymentIntent) {
            switch (paymentIntent.paymentIntent.status) {
              case "succeeded":
                setMessage("Thank you for your purchase!");
                break;
              case "processing":
                setMessage(
                  "Thank you for your purchase, it is currently in progess."
                );
                break;
              case "requires_payment_method":
                setMessage(
                  "We're sorry, your payment failed. Please try with another payment method."
                );
                break;
              default:
                setMessage(
                  "An unknown error has occured. Please try again later."
                );
                break;
            }
          }
        }
      });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Purchase Completed | The Travel Enablers</title>
      </Head>
      <main className={styles.main}>
        <h1>{message}</h1>
      </main>
    </>
  );
};

export default PurchaseCompleted;
