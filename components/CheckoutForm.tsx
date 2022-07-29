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
  const [data, setData] = useState({
    custName: "",
    custEmail: "",
  });
  const { custName, custEmail } = data;

  const options = {
    fields: {
      billingDetails: {
        name: "never" as const,
        email: "never" as const,
      },
    },
  };

  const handleChange = (e: any) => {
    setData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

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
          payment_method_data: {
            billing_details: {
              name: custName,
              email: custEmail,
            },
          },
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
      <div className={styles.custWrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="custName">Name</label>
          <input
            type="text"
            id="custName"
            placeholder="John Doe"
            value={custName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="custEmail">Email</label>
          <input
            type="email"
            id="custEmail"
            placeholder="johndoe@example.com"
            value={custEmail}
            onChange={handleChange}
          />
        </div>
      </div>
      <PaymentElement options={options} />
      <button type="submit" disabled={loading || !stripe || !elements}>
        {loading ? <Spinner /> : "Pay now"}
      </button>
      {errMessage && <span>{errMessage}</span>}
    </form>
  );
};

export default CheckoutForm;
