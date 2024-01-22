package com.dgrytsyna.beautybar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageReplyDTO {

    private String title;

    private String message;

    private String response;
    private String adminEmail;

}
