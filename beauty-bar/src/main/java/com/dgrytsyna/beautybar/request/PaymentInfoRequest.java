package com.dgrytsyna.beautybar.request;
import lombok.Data;

@Data
public class PaymentInfoRequest {
    private int amount;
    private String currency;
    private String receiptEmail;

}