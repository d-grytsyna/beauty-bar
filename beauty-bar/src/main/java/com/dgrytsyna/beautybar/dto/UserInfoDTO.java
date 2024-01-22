package com.dgrytsyna.beautybar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDTO {

    private Integer id;
    private String name;
    private String surname;

    private String email;
    private String tel;

    private Boolean admin;
}
