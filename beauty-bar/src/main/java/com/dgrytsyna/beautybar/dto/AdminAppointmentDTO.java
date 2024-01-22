package com.dgrytsyna.beautybar.dto;

import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AdminAppointmentDTO {

    private Integer id;
    private String clientTel;
    private String clientName;
    private String clientSurname;
    private String clientEmail;
    private String employeeName;
    private String employeeSurname;
    private Timestamp appointmentDate;
    private AppointmentStatus appointmentStatus;
    private String procedureName;
    private Double price;
    private PaymentStatus paymentStatus;

}
