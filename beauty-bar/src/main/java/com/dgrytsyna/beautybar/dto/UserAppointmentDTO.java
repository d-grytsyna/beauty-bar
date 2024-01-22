package com.dgrytsyna.beautybar.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserAppointmentDTO {
    private String employeeName;
    private String employeeSurname;
    private String procedureName;
    private String procedureDescription;
    private Double price;
    private Timestamp appointmentDate;

}
