package com.dgrytsyna.beautybar.entity;
import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import com.dgrytsyna.beautybar.entity.enums.PaymentType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@Table(name="receipt")
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Account client;

    @Column(name="total_amount")
    private Double totalAmount;

    @Column(name="payment_status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Column(name="payment_type")
    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;


    @JsonIgnore
    @OneToOne(mappedBy = "receipt",  fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Appointment appointment;
    public Receipt(Account client, Double totalAmount, PaymentStatus paymentStatus, PaymentType paymentType) {
        this.client = client;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.paymentType = paymentType;
    }
}
