package com.dgrytsyna.beautybar.service;

import com.dgrytsyna.beautybar.dto.ReceiptDTO;
import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.Appointment;
import com.dgrytsyna.beautybar.entity.Receipt;
import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import com.dgrytsyna.beautybar.repository.AccountRepository;
import com.dgrytsyna.beautybar.repository.AppointmentRepository;
import com.dgrytsyna.beautybar.repository.ReceiptRepository;
import com.dgrytsyna.beautybar.request.PaymentInfoRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PaymentService {

    private ReceiptRepository receiptRepository;

    private AccountRepository accountRepository;

    private AppointmentRepository appointmentRepository;

    @Autowired
    public PaymentService(ReceiptRepository receiptRepository, AccountRepository accountRepository,
                          AppointmentRepository appointmentRepository,  @Value("${stripe.key.secret}") String secretKey) {
        this.receiptRepository = receiptRepository;
        this.accountRepository = accountRepository;
        this.appointmentRepository = appointmentRepository;
        Stripe.apiKey = secretKey;
    }

    public List<ReceiptDTO> getReceipts(String username){
        Optional<Account> account = accountRepository.findByEmail(username);
        List<ReceiptDTO> receiptDTOS = new ArrayList<>();
        if(account.isPresent()){
        List<Receipt> receipts = receiptRepository.findAllByClientAndPaymentStatus(account.get(), PaymentStatus.UNPAID);
            for(Receipt receipt: receipts){
                ReceiptDTO receiptDTO = new ReceiptDTO();
                Appointment appointment = appointmentRepository.findByReceipt(receipt);
                if(!appointment.getAppointmentStatus().equals(AppointmentStatus.DECLINED)) {
                    receiptDTO.setProcedureName(appointment.getProcedure().getName());
                    receiptDTO.setReceiptId(receipt.getId());
                    receiptDTO.setDate(appointment.getAppointmentDate());
                    receiptDTO.setTotalAmount(receipt.getTotalAmount());
                    receiptDTO.setPaymentType(receipt.getPaymentType());
                    receiptDTOS.add(receiptDTO);
                }
            }
        }
        return receiptDTOS;
    }

    public List<ReceiptDTO> getHistoryReceipts(String username){
        Optional<Account> account = accountRepository.findByEmail(username);
        List<ReceiptDTO> receiptDTOS = new ArrayList<>();
        if(account.isPresent()){
            List<Receipt> receipts = receiptRepository.findAllByClientAndPaymentStatus(account.get(), PaymentStatus.PAID);
            for(Receipt receipt: receipts){
                ReceiptDTO receiptDTO = new ReceiptDTO();
                Appointment appointment = appointmentRepository.findByReceipt(receipt);
                if(!appointment.getAppointmentStatus().equals(AppointmentStatus.DECLINED)) {
                    receiptDTO.setProcedureName(appointment.getProcedure().getName());
                    receiptDTO.setReceiptId(receipt.getId());
                    receiptDTO.setDate(appointment.getAppointmentDate());
                    receiptDTO.setTotalAmount(receipt.getTotalAmount());
                    receiptDTO.setPaymentType(receipt.getPaymentType());
                    receiptDTOS.add(receiptDTO);
                }
            }
        }
        return receiptDTOS;
    }

    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.getAmount());
        params.put("currency", paymentInfoRequest.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        return PaymentIntent.create(params);
    }

    public ResponseEntity<String> stripePayment(String username, Integer receiptId) throws Exception{
        Optional<Account> account = accountRepository.findByEmail(username);
        Optional<Receipt> receipt = receiptRepository.findById(receiptId);
        if(receipt.isPresent() && account.isPresent()){
            if(receipt.get().getClient().getId().equals(account.get().getId())){
                receipt.get().setPaymentStatus(PaymentStatus.PAID);
                receiptRepository.save(receipt.get());
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
