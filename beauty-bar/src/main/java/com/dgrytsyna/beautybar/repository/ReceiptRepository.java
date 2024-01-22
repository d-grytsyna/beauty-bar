package com.dgrytsyna.beautybar.repository;
import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.Receipt;
import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReceiptRepository extends JpaRepository<Receipt, Integer> {
    List<Receipt> findAllByClientAndPaymentStatus(Account client, PaymentStatus paymentStatus);
}