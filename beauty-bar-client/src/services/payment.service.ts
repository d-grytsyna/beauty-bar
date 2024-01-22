import PaymentInfoRequest from "../models/payment/PaymentInfoRequest";
import api from "./api";

const getAllReceipts= () => {
    return api.get("/payment");
  };

  const getHistoryPayments= () => {
    return api.get("/payment/history");
  };
  const setPayment = (data: PaymentInfoRequest, id: number) =>{
    return api.post("/payment/payment-intent/" + id, data);
  }

  const setPaymentComplete = ( id: number) =>{
    return api.put("/payment/payment-complete/" + id);
  }
  const PaymentService = {
    getAllReceipts,
    getHistoryPayments,
    setPayment,
    setPaymentComplete
  };
  export default PaymentService;