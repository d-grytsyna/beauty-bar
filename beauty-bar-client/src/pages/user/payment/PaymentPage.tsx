import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import PaymentInfoRequest from "../../../models/payment/PaymentInfoRequest";
import TokenService from "../../../services/token.service";
import PaymentService from "../../../services/payment.service";
interface PaymentPageProps {
    totalAmount: number;
    receiptId: number;
    onCancel: () => void;
  }
  const PaymentPage: React.FC<PaymentPageProps> = ({ totalAmount, receiptId, onCancel }) => {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [httpError, setHttpError] = useState(false);
  const [total, setTotal] = useState(totalAmount);
  const elements = useElements();
  const stripe = useStripe();
  async function checkout() {
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }
    setSubmitDisabled(true);
    let paymentInfo = new PaymentInfoRequest(
        Math.round(totalAmount*100),
      "USD",
      TokenService.getUserEmail()
    );
    const stripeResponse = await PaymentService.setPayment(
      paymentInfo,
      receiptId
    );
    if (stripeResponse.status !== 200) {
      setHttpError(true);
      setSubmitDisabled(false);
      throw new Error("Something went wrong!");
    }
    const stripeResponseJson = await stripeResponse.data;
    stripe
      .confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: TokenService.getUserEmail(),
            },
          },
        },
        { handleActions: false }
      )
      .then(async function (result: any) {
        if (result.error) {
          setSubmitDisabled(false);
          alert("There was an error");
        } else {
          const stripeResponse = await PaymentService.setPaymentComplete(
            receiptId
          );
          if (stripeResponse.status !== 200) {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error("Something went wrong!");
          }
          setTotal(0);
          setSubmitDisabled(false);
          alert("Payment was succesfull");
          onCancel();
        }
      });
    setHttpError(false);
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="col-6 d-flex   flex-column">
        <h4>Total: {totalAmount}$</h4>
        <h5 className="mb-3">Credit Card</h5>
        <CardElement id="card-element"></CardElement>
        <button
          disabled={submitDisabled}
          type="button"
          className="btn main-btn main-colour secondary-element-colour mt-3"
          onClick={checkout}
        >
          Pay receipt
        </button>

        <button
        className="accent-btn btn"
        onClick={onCancel}
        disabled={submitDisabled}
        >Cancel</button>
      </div>
    </div>
  );
};
export default PaymentPage;