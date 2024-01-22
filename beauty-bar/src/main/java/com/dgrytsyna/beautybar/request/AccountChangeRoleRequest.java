package com.dgrytsyna.beautybar.request;

import com.dgrytsyna.beautybar.entity.enums.EnumRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountChangeRoleRequest {

    @NotNull
    private Integer id;

    @NotNull
    private Boolean admin;
}
