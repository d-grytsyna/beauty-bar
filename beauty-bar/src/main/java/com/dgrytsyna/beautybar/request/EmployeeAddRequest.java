package com.dgrytsyna.beautybar.request;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.dgrytsyna.beautybar.entity.enums.WorkStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAddRequest {

    @Email
    private String email;

    @NotBlank
    @Size(min = 10, max = 64)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
    private String password;

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

    @NotNull
    private byte[] img;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

}
