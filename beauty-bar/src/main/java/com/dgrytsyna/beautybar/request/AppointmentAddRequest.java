package com.dgrytsyna.beautybar.request;
import com.dgrytsyna.beautybar.entity.enums.PaymentType;
import lombok.Data;

@Data
public class AppointmentAddRequest {
    private Integer procedureId;
    private String date;

    private Integer employeeId;

    private String employeeSurname;

    private String employeeName;

    private String startTime;

    private PaymentType payment;
}
