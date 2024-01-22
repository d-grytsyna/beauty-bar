package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.dto.UserInfoDTO;
import com.dgrytsyna.beautybar.request.AccountChangeRoleRequest;
import com.dgrytsyna.beautybar.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/account")
@PreAuthorize("hasRole('ADMIN')")
public class AccountAdminController {
    private UserService userService;
    @Autowired
    public AccountAdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserInfoDTO> getAllAccounts(){
        return userService.getAllUsers();
    }

    @PutMapping
    public void updateAccountRole(@Valid @RequestBody AccountChangeRoleRequest accountChangeRoleRequest, BindingResult bindingResult){
        if(bindingResult.hasErrors()) throw new IllegalArgumentException();
        userService.changeUserRole(accountChangeRoleRequest);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Integer id){
         userService.deleteAccount(id);
    }
}
