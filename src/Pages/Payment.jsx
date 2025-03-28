import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./Payment.css";

const PayPalButton = ({ amount = "10.00" }) => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "ASVUDSZ3EkWzfgT7ecGSS6-NlnYABsGyW7hMvKEo-pHmbCM7NB33ool9YCbtqvPeQxM5mokbo22nVgO4",
      }}
    >
      <div className="paypal-container">
        <h2>Pay with PayPal</h2>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // Dynamically set the amount
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            return actions.order.capture().then((details) => {
              setSuccess(true);
              alert(`Transaction completed by ${details.payer.name.given_name}`);
            });
          }}
          onError={(err) => {
            setErrorMessage("Something went wrong with the payment.");
            console.error("PayPal Error:", err);
          }}
        />

        {/* Success Message */}
        {success && <p style={{ color: "green" }}>Payment Successful!</p>}

        {/* Error Message */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;