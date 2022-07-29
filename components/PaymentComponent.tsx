import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PK}`);

const PaymentComponent = () => {
  const [clientSecret, setClientSecret] = useState(undefined);

  useEffect(() => {
    fetch("/api/createPaymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 10000,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "flat" as const,
    variables: {
      fontFamily: '"Poppins", sans-serif',
      fontWeightNormal: "400",
      colorPrimary: "#560107",
      colorText: "#000e0c",
    },
    rules: {
      ".Label": {
        color: "#168d79",
        fontFamily: '"Ibarra Real Nova", serif',
        fontWeight: "500",
        fontSize: "1.3rem",
      },
    },
  };

  return (
    <div style={{ margin: "0 20%" }}>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
            appearance: appearance,
            fonts: [
              {
                cssSrc:
                  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap",
              },
              {
                cssSrc:
                  "https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@400;500;700",
              },
            ],
          }}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentComponent;
