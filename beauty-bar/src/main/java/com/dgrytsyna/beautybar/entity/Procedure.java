package com.dgrytsyna.beautybar.entity;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="procedure")
public class Procedure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "procedure_type")
    @NotNull
    private ProcedureType type;

    @Column(name = "procedure_name")
    @NotBlank
    @Size(max = 50, min = 2)
    private String name;

    @Column(name="description")
    @NotBlank
    @Size(max = 300, min = 2)
    private String description;

    @Column(name = "price")
    @NotNull
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "1000.0")
    private Double price;

    @Column(name = "estimated_time")
    @NotBlank
    @Pattern(regexp = "^([01]\\d|2[0-3]):[0-5]\\d$")
    private String time;

    @Column(name="discount")
    @NotNull
    @Min(value = 0)
    @Max(value = 80)
    private Short discount;

    @Column(name ="image_data")
    private byte[] img;

    @JsonIgnore
    @OneToMany(mappedBy = "procedure", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
