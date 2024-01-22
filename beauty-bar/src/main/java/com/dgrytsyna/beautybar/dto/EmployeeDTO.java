package com.dgrytsyna.beautybar.dto;

import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.dgrytsyna.beautybar.entity.enums.WorkStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDTO {
    @NotNull
    private Integer id;

    @NotBlank
    @Pattern(regexp = "\\d{3}-\\d{3}-\\d{4}")
    private String tel;

    @NotBlank
    @Size(max = 50, min = 2)
    private String name;

    @NotBlank
    @Size(max = 50, min = 2)
    private String surname;

    @NotNull
    private ProcedureType workType;

    @NotNull
    private WorkStatus workStatus;
    private byte[] img;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

}
