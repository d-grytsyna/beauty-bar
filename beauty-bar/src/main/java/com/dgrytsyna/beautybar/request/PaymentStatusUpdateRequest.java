package com.dgrytsyna.beautybar.request;

import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentStatusUpdateRequest {
    private Integer id;
    private PaymentStatus status;
}
