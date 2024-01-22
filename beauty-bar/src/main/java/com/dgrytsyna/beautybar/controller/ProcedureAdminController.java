package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.entity.Procedure;
import com.dgrytsyna.beautybar.exception.CouldNotUpdateException;
import com.dgrytsyna.beautybar.service.ProcedureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/admin/procedure")
public class ProcedureAdminController {

    private ProcedureService procedureService;

    @Autowired
    public ProcedureAdminController( ProcedureService procedureService) {
        this.procedureService = procedureService;
    }

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public List<Procedure> getProcedures(){
        List<Procedure> procedures = procedureService.findAllProcedures();
        return procedures;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Procedure updateProcedure(@Valid @RequestBody Procedure procedure, BindingResult bindingResult){
        if (bindingResult.hasErrors()) throw new IllegalArgumentException();
        return procedureService.updateProcedure(procedure);


    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public Procedure addProcedure(@Valid @RequestBody Procedure procedure, BindingResult bindingResult){
        if (bindingResult.hasErrors()) throw new IllegalArgumentException();
        return procedureService.addProcedure(procedure);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProcedure(@PathVariable Integer id){
         procedureService.deleteProcedure(id);
    }

}