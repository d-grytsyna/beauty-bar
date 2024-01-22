import { useEffect, useState } from "react";
import PaymentService from "../../../services/payment.service";
import { useHistory } from "react-router-dom";
import TimeFormatService from "../../../utils/format.functions";
export const UserPaymentHistory = () => {
  const [receipts, setReceipts] = useState<ReceiptInfo[]>([]);
  const history = useHistory();
  useEffect(() => {
    PaymentService.getHistoryPayments().then(
      (response) => {
        setReceipts(response.data);
      },
      (error) => {
        const _content = history.push("/error");
      }
    );
  }, []);
  return (
    <div className="container mt-5 mb-5">
      <div className="row g-5 p-3 ">
        {receipts && receipts.length > 0 ? (
          receipts.map((receipt) => (
            <div className="col-4" key={receipt.receiptId}>
              <h4>Total: {receipt.totalAmount}$</h4>
              <h5>{TimeFormatService.formatDateTime(receipt.date)}</h5>
              <p className="receipt-info">{receipt.procedureName}</p>
              <p>Payment type: {receipt.paymentType}</p>
            </div>
          ))
        ) : (
          <p>No payment history</p>
        )}
      </div>
    </div>
  );
};
