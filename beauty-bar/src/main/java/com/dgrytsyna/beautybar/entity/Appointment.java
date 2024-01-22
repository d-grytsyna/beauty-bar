package com.dgrytsyna.beautybar.entity;
import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Account client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "procedure_id", referencedColumnName = "id")
    private Procedure procedure;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "receipt_id", referencedColumnName = "id")
    private Receipt receipt;


    @Column(name="appointment_date")
    private Timestamp appointmentDate;

    @Enumerated(EnumType.STRING)
    @Column(name="appointment_status")
    private AppointmentStatus appointmentStatus;



    public Appointment(Account client, Employee employee, Procedure procedure, Receipt receipt, Timestamp appointmentDate, AppointmentStatus appointmentStatus) {
        this.client = client;
        this.employee = employee;
        this.procedure = procedure;
        this.receipt = receipt;
        this.appointmentDate = appointmentDate;
        this.appointmentStatus = appointmentStatus;
    }
}
