package com.dgrytsyna.beautybar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserMessageDTO {

    private Integer id;
    private String name;

    private String surname;

    private String tel;

    private String email;

    private String title;

    private String message;
}
