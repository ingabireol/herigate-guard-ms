package com.heritage.heritagebn.service;

import com.heritage.heritagebn.dto.request.LoginRequest;
import com.heritage.heritagebn.dto.request.SignupRequest;
import com.heritage.heritagebn.dto.response.JwtResponse;
import com.heritage.heritagebn.dto.response.ApiResponse;

public interface AuthService {
    
    JwtResponse authenticateUser(LoginRequest loginRequest);
    
    ApiResponse registerUser(SignupRequest signupRequest);
    
    JwtResponse refreshToken(String refreshToken);
    
    ApiResponse logoutUser();
}