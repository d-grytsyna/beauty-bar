class ReceiptInfo{
    procedureName: string;
    date: string;
    receiptId: number;
    totalAmount: number;
    paymentType: string;
    constructor(
        procedureName: string,
        date: string,
        receiptId: number,
        totalAmount: number,
        paymentType: string
    ){
        this.procedureName = procedureName;
        this.date = date;
        this.receiptId = receiptId;
        this.totalAmount = totalAmount;
        this.paymentType = paymentType;
    }
}