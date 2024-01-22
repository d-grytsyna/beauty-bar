package com.dgrytsyna.beautybar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAppointmentInfo {
    private List<LocalTime> appointmentTime;
    private String employeeName;
    private String employeeSurname;

    private Integer employeeId;
    private byte[] image;
}
