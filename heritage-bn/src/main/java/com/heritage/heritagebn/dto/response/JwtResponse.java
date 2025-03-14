package com.heritage.heritagebn.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String refreshToken;
    private String tokenType;
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
}