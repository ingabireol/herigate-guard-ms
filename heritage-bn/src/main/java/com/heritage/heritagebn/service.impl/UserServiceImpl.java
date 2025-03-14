package com.heritage.heritagebn.service.impl;

import com.heritage.heritagebn.dto.request.UserUpdateRequest;
import com.heritage.heritagebn.dto.response.ApiResponse;
import com.heritage.heritagebn.dto.response.UserResponse;
import com.heritage.heritagebn.entity.Role;
import com.heritage.heritagebn.entity.User;
import com.heritage.heritagebn.exception.BadRequestException;
import com.heritage.heritagebn.exception.ResourceNotFoundException;
import com.heritage.heritagebn.repository.RoleRepository;
import com.heritage.heritagebn.repository.UserRepository;
import com.heritage.heritagebn.security.CustomUserDetails;
import com.heritage.heritagebn.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserResponse getCurrentUser() {
        CustomUserDetails currentUser = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
        
        return mapUserToUserResponse(user);
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        return mapUserToUserResponse(user);
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        return mapUserToUserResponse(user);
    }

    @Override
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(this::mapUserToUserResponse);
    }

    @Override
    public Page<UserResponse> searchUsers(String keyword, Pageable pageable) {
        return userRepository.search(keyword, pageable)
                .map(this::mapUserToUserResponse);
    }

    @Override
    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest updateRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        // Check if username is being updated and is unique
        if (StringUtils.hasText(updateRequest.getUsername()) && 
                !user.getUsername().equals(updateRequest.getUsername())) {
            
            if (userRepository.existsByUsername(updateRequest.getUsername())) {
                throw new BadRequestException("Username is already taken");
            }
            user.setUsername(updateRequest.getUsername());
        }
        
        // Check if email is being updated and is unique
        if (StringUtils.hasText(updateRequest.getEmail()) && 
                !user.getEmail().equals(updateRequest.getEmail())) {
            
            if (userRepository.existsByEmail(updateRequest.getEmail())) {
                throw new BadRequestException("Email is already in use");
            }
            user.setEmail(updateRequest.getEmail());
        }
        
        // Update other fields
        Optional.ofNullable(updateRequest.getFirstName()).ifPresent(user::setFirstName);
        Optional.ofNullable(updateRequest.getLastName()).ifPresent(user::setLastName);
        Optional.ofNullable(updateRequest.getActive()).ifPresent(user::setActive);
        
        // Update roles if provided
        if (updateRequest.getRoles() != null && !updateRequest.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>();
            
            updateRequest.getRoles().forEach(roleName -> {
                switch (roleName.toUpperCase()) {
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
                    case "USER":
                        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role USER is not found."));
                        roles.add(userRole);
                        break;
                    default:
                        throw new BadRequestException("Invalid role: " + roleName);
                }
            });
            
            user.setRoles(roles);
        }
        
        User updatedUser = userRepository.save(user);
        return mapUserToUserResponse(updatedUser);
    }

    @Override
    @Transactional
    public ApiResponse deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        userRepository.delete(user);
        return new ApiResponse(true, "User deleted successfully");
    }

    @Override
    @Transactional
    public ApiResponse changeUserActiveStatus(Long id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        user.setActive(active);
        userRepository.save(user);
        
        return new ApiResponse(true, 
                "User " + (active ? "activated" : "deactivated") + " successfully");
    }
    
    private UserResponse mapUserToUserResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());
        
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .active(user.getActive())
                .emailVerified(user.getEmailVerified())
                .provider(user.getProvider().name())
                .roles(roles)
                .createdDate(user.getCreatedDate())
                .lastModifiedDate(user.getLastModifiedDate())
                .build();
    }
}