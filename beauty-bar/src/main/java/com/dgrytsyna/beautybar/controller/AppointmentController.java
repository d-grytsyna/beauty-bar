package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.UserAppointmentDTO;
import com.dgrytsyna.beautybar.request.AppointmentAddRequest;
import com.dgrytsyna.beautybar.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
    private AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void addAppointment(@RequestBody AppointmentAddRequest appointmentAddRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            appointmentService.addAppointment(appointmentAddRequest, username);
        }else throw new IllegalArgumentException();
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<UserAppointmentDTO> getAppointments(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return appointmentService.getAppointments(username);
        } else throw new IllegalArgumentException();
    }

    @GetMapping("/history")
    @PreAuthorize("hasRole('USER')")
    public List<UserAppointmentDTO> getAppointmentsHistory(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return appointmentService.getAppointmentsHistory(username);
        } else throw new IllegalArgumentException();
    }
}
