package com.heritage.heritagebn.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityService {

    /**
     * Check if the current authenticated user is the same as the requested user id
     * Used for PreAuthorize annotations
     */
    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return ((CustomUserDetails) principal).getId().equals(userId);
        }
        
        return false;
    }
    
    /**
     * Check if the current user has a specific role
     */
    public boolean hasRole(String role) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals(role));
    }
}