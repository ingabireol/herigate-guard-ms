package com.heritage.heritagebn.service.impl;

import com.heritage.heritagebn.dto.request.LoginRequest;
import com.heritage.heritagebn.dto.request.SignupRequest;
import com.heritage.heritagebn.dto.response.ApiResponse;
import com.heritage.heritagebn.dto.response.JwtResponse;
import com.heritage.heritagebn.entity.Role;
import com.heritage.heritagebn.entity.User;
import com.heritage.heritagebn.exception.BadRequestException;
import com.heritage.heritagebn.repository.RoleRepository;
import com.heritage.heritagebn.repository.UserRepository;
import com.heritage.heritagebn.security.CustomUserDetails;
import com.heritage.heritagebn.security.JwtTokenProvider;
import com.heritage.heritagebn.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(userDetails);
        
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return JwtResponse.builder()
                .token(jwt)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .roles(roles)
                .build();
    }

    @Override
    @Transactional
    public ApiResponse registerUser(SignupRequest signupRequest) {
        // Validate username and email uniqueness
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        // Create new user
        User user = User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .provider(User.AuthProvider.LOCAL)
                .active(true)
                .emailVerified(false)
                .build();

        // Assign roles
        Set<Role> roles = new HashSet<>();

        if (signupRequest.getRoles() == null || signupRequest.getRoles().isEmpty()) {
            // Default role
            Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role USER is not found."));
            roles.add(userRole);
        } else {
            signupRequest.getRoles().forEach(role -> {
                switch (role.toUpperCase()) {
                    case "ADMIN":
                        Role adminRole = roleRepository.findByName(Role.RoleName.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role ADMIN is not found."));
                        roles.add(adminRole);
                        break;
                    case "MANAGER":
                        Role managerRole = roleRepository.findByName(Role.RoleName.ROLE_MANAGER)
                                .orElseThrow(() -> new RuntimeException("Error: Role MANAGER is not found."));
                        roles.add(managerRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role USER is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return new ApiResponse(true, "User registered successfully");
    }

    @Override
    public JwtResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new BadRequestException("Invalid refresh token");
        }
        
        String username = tokenProvider.getUsernameFromToken(refreshToken);
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
        
        // Create new authentication
        UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        
        // Generate new tokens
        String newAccessToken = tokenProvider.generateToken(authentication);
        String newRefreshToken = tokenProvider.generateRefreshToken(userDetails);
        
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        
        return JwtResponse.builder()
                .token(newAccessToken)
                .refreshToken(newRefreshToken)
                .tokenType("Bearer")
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .roles(roles)
                .build();
    }

    @Override
    public ApiResponse logoutUser() {
        // In a stateless JWT authentication, server-side logout is not applicable
        // Client should discard the token
        return new ApiResponse(true, "Logout successful");
    }
}