package com.dgrytsyna.beautybar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcedureAppointmentDTO {
    private List<EmployeeAppointmentInfo> employeeAppointment;
    private LocalDate date;

    private String procedureName;

    private Integer procedureId;
    private Double price;

    private Short discount;

    private String estimatedTime;

}
