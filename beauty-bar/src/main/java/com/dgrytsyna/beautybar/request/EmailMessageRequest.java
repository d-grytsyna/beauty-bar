package com.dgrytsyna.beautybar.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailMessageRequest {

    @NotBlank
    @Email
    private String user;

    @NotBlank
    private String message;
}
