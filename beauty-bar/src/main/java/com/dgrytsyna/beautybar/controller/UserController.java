package com.dgrytsyna.beautybar.controller;

import com.dgrytsyna.beautybar.request.PasswordChangeRequest;
import com.dgrytsyna.beautybar.request.ProfileEdit;
import com.dgrytsyna.beautybar.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@PreAuthorize("hasRole('USER') || hasRole('EMPLOYEE') || hasRole('ADMIN') ")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ProfileEdit getProfileInfo(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return  userService.getProfileInfo(username);
        } else throw new IllegalArgumentException();
    }

    @PutMapping
    public ProfileEdit putProfileInfo(@Valid @RequestBody ProfileEdit profileEdit){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            return  userService.updateProfileInfo(username, profileEdit);
        } else throw new IllegalArgumentException();
    }

    @PutMapping("/password")
    public void updatePassword(@Valid @RequestBody PasswordChangeRequest passwordChangeRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            userService.updatePassword(username, passwordChangeRequest);
        } else throw new IllegalArgumentException();
    }
}