package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.ProcedureAppointmentDTO;
import com.dgrytsyna.beautybar.entity.Procedure;
import com.dgrytsyna.beautybar.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/procedure")
public class ProcedureController {

    private ProcedureService procedureService;

    @Autowired
    public ProcedureController(ProcedureService procedureService) {
        this.procedureService = procedureService;
    }

    @GetMapping("/{category}")
    public List<Procedure> getProcedures(@PathVariable String category){
        List<Procedure> procedures = procedureService.findAllByType(category);
        return procedures;
    }
    @GetMapping("/{category}/{id}")
    @PreAuthorize("hasRole('USER')")
    public ProcedureAppointmentDTO getProcedureAppointments(@PathVariable String category, @PathVariable Integer id,@RequestParam("date") String dateString){
        LocalDate date1 = LocalDate.parse(dateString);
        ProcedureAppointmentDTO procedures = procedureService.getAllAppointmentTime(category, date1, id);
        return procedures;
    }


}
