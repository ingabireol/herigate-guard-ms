package com.heritage.heritagebn.controller;

import com.heritage.heritagebn.dto.request.LoginRequest;
import com.heritage.heritagebn.dto.request.SignupRequest;
import com.heritage.heritagebn.dto.response.ApiResponse;
import com.heritage.heritagebn.dto.response.JwtResponse;
import com.heritage.heritagebn.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.authenticateUser(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok(authService.registerUser(signupRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refreshToken(@RequestParam String refreshToken) {
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logoutUser() {
        return ResponseEntity.ok(authService.logoutUser());
    }
}