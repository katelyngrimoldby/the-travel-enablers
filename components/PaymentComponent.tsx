import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import styles from "../styles/PaymentComponent.module.scss";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_TEST_PK}`);

type ClientSecrets = {
  depositSecret: string;
  planSecrets: string[];
};

type PaymentProps = {
  deposit: number;
  amounts: number[];
  product: string;
  packages: string[];
};

const PaymentComponent = ({
  deposit,
  amounts,
  product,
  packages,
}: PaymentProps) => {
  const [customer, setCustomer] = useState({
    cName: "",
    cEmail: "",
  });
  const [clientSecrets, setClientSecrets] = useState<ClientSecrets>();
  const [plan, setPlan] = useState<number>();
  const [currentSecret, setCurrentSecret] = useState("");

  useEffect(() => {
    if (!plan) {
      return;
    }

    if (clientSecrets) {
      setCurrentSecret(clientSecrets.planSecrets[plan]);
    }
  }, [plan, clientSecrets]);

  const handleRadioChange = (e: any) => {
    setPlan(e.target.id);
  };

  const handleChange = (e: any) => {
    setCustomer((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // when customer submits personal info
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const stripeAmounts = amounts.map((e) => {
      return e * 100;
    });

    fetch("/api/createPaymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deposit: deposit * 100,
        amounts: stripeAmounts,
        product: product,
        customerData: {
          name: customer.cName,
          email: customer.cEmail,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecrets(data);
      });
  };

  //appearance for paymentElements
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
    <div style={{ margin: "0 20%" }} className={styles.wrapper}>
      {clientSecrets ? (
        <>
          <div onChange={handleRadioChange} className={styles.radioWrapper}>
            <h3>Select a Package</h3>
            {packages.map((e, i) => {
              return (
                <div key={i}>
                  <input type="radio" name="pkg" id={i.toString()} value={i} />
                  <label
                    htmlFor={i.toString()}
                  >{`${e} - $${amounts[i]}`}</label>
                </div>
              );
            })}
          </div>

          <div className={styles.paymentWrapper}>
            <div className={styles.elementWrapper}>
              <h3>Pay the Deposit to Start a Payment Plan</h3>
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: clientSecrets.depositSecret,
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
                <CheckoutForm clientSecret={clientSecrets.depositSecret} />
              </Elements>
            </div>
            {currentSecret && (
              <div key={currentSecret} className={styles.elementWrapper}>
                <h3>Or Pay in Full Now</h3>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: currentSecret,
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
                  <CheckoutForm clientSecret={currentSecret} />
                </Elements>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.form}>
          <h3>Input Your Name and Email</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.custWrapper}>
              <div className={styles.inputWrapper}>
                <label htmlFor="cName">Name</label>
                <input
                  type="text"
                  id="cName"
                  placeholder="John Doe"
                  value={customer.cName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="cEmail">Email</label>
                <input
                  type="email"
                  id="cEmail"
                  placeholder="johndoe@example.com"
                  value={customer.cEmail}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit">Next</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
