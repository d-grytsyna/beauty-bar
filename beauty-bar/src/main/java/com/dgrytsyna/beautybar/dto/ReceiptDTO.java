package com.dgrytsyna.beautybar.dto;

import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import com.dgrytsyna.beautybar.entity.enums.PaymentType;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ReceiptDTO {
    private String procedureName;
    private Timestamp date;
    private Integer receiptId;
    private Double totalAmount;

    private PaymentType paymentType;
}
