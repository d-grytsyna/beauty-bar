package com.dgrytsyna.beautybar.security.auth.payload.response;

import lombok.Data;


@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Integer id;
    private String email;
    private String role;

    private String refreshToken;

    public JwtResponse(String token,  Integer id, String email, String role, String refreshToken) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.role = role;
        this.refreshToken = refreshToken;
    }
}
