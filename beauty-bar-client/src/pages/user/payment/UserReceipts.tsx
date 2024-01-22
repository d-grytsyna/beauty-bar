import { useEffect, useState } from "react";
import PaymentService from "../../../services/payment.service";
import { useHistory } from "react-router-dom";
import TimeFormatService from "../../../utils/format.functions";
import PaymentPage from "./PaymentPage";
export const UserReceipts = () => {
  const [receipts, setReceipts] = useState<ReceiptInfo[]>([]);
  const [chosenReceipt, setChosenReceipt] = useState<ReceiptInfo | null>(null);
  const history = useHistory();
  useEffect(() => {
    PaymentService.getAllReceipts().then(
      (response) => {
        setReceipts(response.data);
      },
      (error) => {
        const _content = history.push("/error");
      }
    );
  }, [chosenReceipt]);

  const handleCancel = () => {
    setChosenReceipt(null);
  };
  return (
    <div className="container mt-5 mb-5">
      {chosenReceipt && (
        <PaymentPage
          totalAmount={chosenReceipt.totalAmount}
          receiptId={chosenReceipt.receiptId}
          onCancel={handleCancel}
        />
      )}
      {!chosenReceipt && (
        <div className="row g-5 p-3 ">
          {receipts && receipts.length > 0 ? (
            receipts.map((receipt) => (
              <div className="col-4" key={receipt.receiptId}>
                <h4>Total: {receipt.totalAmount}$</h4>
                <h5>{TimeFormatService.formatDateTime(receipt.date)}</h5>
                <p className="receipt-info">{receipt.procedureName}</p>
                {receipt.paymentType==='CARD'&&                 <button className=" main-btn btn secondary-colour main-element-colour"onClick={() => setChosenReceipt(receipt)}>Pay</button>}

              </div>
            ))
          ) : (
            <p>No current payments</p>
          )}
        </div>
      )}
    </div>
  );
};
