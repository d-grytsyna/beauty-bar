package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.AdminAppointmentDTO;
import com.dgrytsyna.beautybar.request.AppointmentStatusUpdateRequest;
import com.dgrytsyna.beautybar.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@PreAuthorize("hasRole('EMPLOYEE')")
@RequestMapping("/api/employee/appointment")
public class AppointmentEmployeeController {

    private AppointmentService appointmentService;

    @Autowired
    public AppointmentEmployeeController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<AdminAppointmentDTO> getProcedureAppointments(@RequestParam("date") String dateString){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            LocalDate date1 = LocalDate.parse(dateString);
            List<AdminAppointmentDTO> employeeAppointments = appointmentService.getEmployeeAppointments(username, date1);
            return employeeAppointments;
        } else throw new IllegalArgumentException();

    }

    @PutMapping("/status-update")
    public void updateProcedureStatus(@RequestBody AppointmentStatusUpdateRequest appointmentStatusUpdateRequest){
         appointmentService.updateAppointmentStatus(appointmentStatusUpdateRequest);
    }

}
