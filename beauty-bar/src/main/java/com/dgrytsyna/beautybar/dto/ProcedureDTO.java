package com.dgrytsyna.beautybar.dto;

import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProcedureDTO {
    private ProcedureType type;

    @NotBlank
    @Size(max = 50, min = 2)
    private String name;

    @NotBlank
    @Size(max = 300, min = 2)
    private String description;

    @NotNull
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "1000.0")
    private Double price;

    @NotBlank
    @Pattern(regexp = "^([01]\\d|2[0-3]):[0-5]\\d$")
    private String time;

    @NotNull
    @Min(value = 0)
    @Max(value = 80)
    private Short discount;

    private byte[] img;
}
