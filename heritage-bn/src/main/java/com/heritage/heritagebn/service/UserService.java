package com.heritage.heritagebn.service;

import com.heritage.heritagebn.dto.request.UserUpdateRequest;
import com.heritage.heritagebn.dto.response.ApiResponse;
import com.heritage.heritagebn.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    
    UserResponse getCurrentUser();
    
    UserResponse getUserById(Long id);
    
    UserResponse getUserByUsername(String username);
    
    Page<UserResponse> getAllUsers(Pageable pageable);
    
    Page<UserResponse> searchUsers(String keyword, Pageable pageable);
    
    UserResponse updateUser(Long id, UserUpdateRequest userUpdateRequest);
    
    ApiResponse deleteUser(Long id);
    
    ApiResponse changeUserActiveStatus(Long id, boolean active);
}