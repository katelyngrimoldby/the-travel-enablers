import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Spinner from "./Spinner";
import styles from "../styles/CheckoutForm.module.scss";

type FormProps = {
  clientSecret: string;
};

const CheckoutForm = ({ clientSecret }: FormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const res = await stripe.retrievePaymentIntent(clientSecret);
    if (res.paymentIntent) {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/purchase_completed`,
        },
      });
      if (error) {
        if (typeof error.message == "string") {
          setErrMessage(error.message);
        }
      }
    }
    setLoading(false);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={loading || !stripe || !elements}>
        {loading ? <Spinner /> : "Pay now"}
      </button>
      {errMessage && <span>{errMessage}</span>}
    </form>
  );
};

export default CheckoutForm;
