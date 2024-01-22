package com.dgrytsyna.beautybar.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileEdit {

    @NotBlank
    @Size(max = 50, min = 2)
    private String name;

    @NotBlank
    @Size(max = 50, min = 2)
    private String surname;

    @NotBlank
    @Pattern(regexp = "\\d{3}-\\d{3}-\\d{4}")
    private String tel;
}
