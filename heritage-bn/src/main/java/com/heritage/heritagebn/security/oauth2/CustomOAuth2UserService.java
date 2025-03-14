package com.heritage.heritagebn.security.oauth2;

import com.heritage.heritagebn.entity.Role;
import com.heritage.heritagebn.entity.User;
import com.heritage.heritagebn.exception.OAuth2AuthenticationProcessingException;
import com.heritage.heritagebn.repository.RoleRepository;
import com.heritage.heritagebn.repository.UserRepository;
import com.heritage.heritagebn.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());
        
        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            
            if (!user.getProvider().toString().equalsIgnoreCase(registrationId)) {
                throw new OAuth2AuthenticationProcessingException("You're signed up with " + 
                        user.getProvider() + " account. Please use your " + user.getProvider() + 
                        " account to login.");
            }
            
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return (OAuth2User) CustomUserDetails.create(user);
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setProvider(User.AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setUsername(generateUsername(oAuth2UserInfo));
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setEmailVerified(true);
        user.setActive(true);
        
        // Set name if available
        String[] names = splitName(oAuth2UserInfo.getName());
        if (names.length > 0) {
            user.setFirstName(names[0]);
        }
        if (names.length > 1) {
            user.setLastName(names[1]);
        }
        
        // Set default USER role
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role USER is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        // Update user information if needed
        String[] names = splitName(oAuth2UserInfo.getName());
        if (names.length > 0 && !StringUtils.hasText(existingUser.getFirstName())) {
            existingUser.setFirstName(names[0]);
        }
        if (names.length > 1 && !StringUtils.hasText(existingUser.getLastName())) {
            existingUser.setLastName(names[1]);
        }
        
        return userRepository.save(existingUser);
    }
    
    private String generateUsername(OAuth2UserInfo oAuth2UserInfo) {
        String email = oAuth2UserInfo.getEmail();
        String baseUsername = email.split("@")[0];
        
        // Check if the username exists and generate a unique one
        String username = baseUsername;
        int suffix = 1;
        
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + suffix;
            suffix++;
        }
        
        return username;
    }
    
    private String[] splitName(String fullName) {
        if (!StringUtils.hasText(fullName)) {
            return new String[0];
        }
        return fullName.split(" ", 2);
    }
}