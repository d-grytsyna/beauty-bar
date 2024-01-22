package com.dgrytsyna.beautybar.security.auth.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

    @Email
    private String email;

    @NotBlank
    @Size(min = 10, max = 64)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
    private String password;

    @NotBlank
    @Pattern(regexp = "\\d{3}-\\d{3}-\\d{4}")
    private String tel;

    @NotBlank
    @Size(max = 50, min = 2)
    private String name;

    @NotBlank
    @Size(max = 50, min = 2)
    private String surname;

}
