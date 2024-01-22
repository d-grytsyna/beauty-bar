package com.dgrytsyna.beautybar.entity;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.dgrytsyna.beautybar.entity.enums.WorkStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(name="work_type")
    private ProcedureType workType;

    @Enumerated(EnumType.STRING)
    @Column(name="work_status")
    private WorkStatus workStatus;

    @Column(name ="profile_picture")
    private byte[] img;

    @Column(name="work_start_time")
    private LocalTime startTime;

    @Column(name="work_end_time")
    private LocalTime endTime;

    @JsonIgnore
    @OneToMany(mappedBy = "employee",  fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Appointment> appointments;

}
