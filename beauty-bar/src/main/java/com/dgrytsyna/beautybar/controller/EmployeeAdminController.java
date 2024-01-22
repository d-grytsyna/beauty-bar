package com.dgrytsyna.beautybar.controller;


import com.dgrytsyna.beautybar.dto.EmployeeDTO;
import com.dgrytsyna.beautybar.entity.Employee;
import com.dgrytsyna.beautybar.request.EmployeeAddRequest;
import com.dgrytsyna.beautybar.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/employee")
public class EmployeeAdminController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeAdminController( EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping()
    public List<EmployeeDTO> getEmployees(){
        List<EmployeeDTO> employee = employeeService.getAllEmployees();
        return employee;
    }

    @PutMapping("/{id}")
    public EmployeeDTO updateEmployee(@Valid @RequestBody EmployeeDTO employeeDTO, BindingResult bindingResult){
        if(bindingResult.hasErrors()) throw new IllegalArgumentException();
        return employeeService.updateEmployee(employeeDTO);

    }

    @PostMapping()
    public Employee saveEmployee(@Valid @RequestBody EmployeeAddRequest employeeAddRequest, BindingResult
                                 bindingResult){
        if(bindingResult.hasErrors()) throw new IllegalArgumentException();
        return employeeService.saveEmployee(employeeAddRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Integer id){
         employeeService.deleteEmployee(id);
    }

}
