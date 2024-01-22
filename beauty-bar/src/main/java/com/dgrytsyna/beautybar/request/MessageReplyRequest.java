package com.dgrytsyna.beautybar.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageReplyRequest {

    @NotNull
    private Integer id;

    @NotBlank
    private String response;
}
