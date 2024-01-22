package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.AdminAppointmentDTO;
import com.dgrytsyna.beautybar.email.EmailService;
import com.dgrytsyna.beautybar.request.AppointmentStatusUpdateRequest;
import com.dgrytsyna.beautybar.request.EmailMessageRequest;
import com.dgrytsyna.beautybar.request.PaymentStatusUpdateRequest;
import com.dgrytsyna.beautybar.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/appointment")
public class AppointmentAdminController {

    private AppointmentService appointmentService;

    private EmailService emailService;

    @Autowired
    public AppointmentAdminController(AppointmentService appointmentService, EmailService emailService) {
        this.appointmentService = appointmentService;
        this.emailService = emailService;
    }

    @GetMapping
    public List<AdminAppointmentDTO> getProcedureAppointments(@RequestParam("date") String dateString){
        LocalDate date1 = LocalDate.parse(dateString);
        List<AdminAppointmentDTO> adminAppointmentDTO = appointmentService.getAppointmentsOnDate(date1);
        return adminAppointmentDTO;
    }

    @PutMapping("/status-update")
    public void updateProcedureStatus(@RequestBody AppointmentStatusUpdateRequest appointmentStatusUpdateRequest){
         appointmentService.updateAppointmentStatus(appointmentStatusUpdateRequest);
    }

    @PutMapping("/payment-update")
    public void paymentStatusUpdate(@Valid @RequestBody PaymentStatusUpdateRequest appointmentStatusUpdateRequest,
                                    BindingResult bindingResult){
        if(bindingResult.hasErrors()) throw new IllegalArgumentException();
         appointmentService.updatePaymentStatus(appointmentStatusUpdateRequest);
    }

    @PostMapping("/reminder")
    public void sendReminder(@Valid @RequestBody EmailMessageRequest message, BindingResult bindingResult){
        if(bindingResult.hasErrors()) throw new IllegalArgumentException();
        emailService.sendReminder(message.getUser(), message.getMessage());

    }
}
