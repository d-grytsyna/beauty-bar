package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.ReceiptDTO;
import com.dgrytsyna.beautybar.request.PaymentInfoRequest;
import com.dgrytsyna.beautybar.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("/api/payment")
public class PaymentController {

    private PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<ReceiptDTO> getAllReceipts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return paymentService.getReceipts(username);
        } else throw new IllegalArgumentException();
    }

    @GetMapping("/history")
    public List<ReceiptDTO> getAllHistoryReceipts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return paymentService.getHistoryReceipts(username);
        } else throw new IllegalArgumentException();
    }

    @PostMapping("/payment-intent/{id}")
    public ResponseEntity<String> createPaymentIntent(@PathVariable Integer id, @RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

    @PutMapping("/payment-complete/{id}")
    public ResponseEntity<String> stripePaymentComplete(@PathVariable Integer id) throws Exception{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return paymentService.stripePayment(username, id);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
