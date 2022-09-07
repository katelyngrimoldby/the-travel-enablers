import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Hero from "../../components/Hero";
import heroImg from "../../public/cardPage-hero-img.jpg";
import Divider from "../../icons/Divider";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PK}`);

const PurchaseCompleted: NextPage = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Boolean | undefined>(undefined);

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
                setStatus(true);
                setMessage(
                  "You will recieve an email shortly from The Travel Enablers detailing everything you need to know about your trip."
                );
                break;
              case "processing":
                setStatus(true);
                setMessage(
                  "Your purchase is currently in progress, and you will recieve an email shortly from The Travel Enablers detailing everything you need to know about your trip."
                );
                break;
              case "requires_payment_method":
                setStatus(false);
                setMessage(
                  "We're sorry, your payment failed. Please try again with another payment method."
                );
                break;
              default:
                setStatus(false);
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
      <main>
        <Hero imgSrc={heroImg}>
          {status ? (
            <h1>THANK YOU FOR YOUR PURCHASE</h1>
          ) : (
            <h1>THERE WAS AN ERROR WITH YOUR PURCHASE</h1>
          )}
          <span>{message}</span>
          <Divider />
        </Hero>
      </main>
    </>
  );
};

export default PurchaseCompleted;
