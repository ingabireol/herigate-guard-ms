package com.heritage.heritagebn.util;

public class AppConstants {
    // JWT related constants
    public static final String TOKEN_TYPE = "Bearer";
    public static final String AUTH_HEADER = "Authorization";
    
    // API response messages
    public static final String SUCCESS = "Success";
    public static final String CREATED = "Created successfully";
    public static final String UPDATED = "Updated successfully";
    public static final String DELETED = "Deleted successfully";
    
    // Default pagination
    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "id";
    public static final String DEFAULT_SORT_DIRECTION = "asc";
    
    // Role names
    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_MANAGER = "ROLE_MANAGER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    
    // Protected paths
    public static final String[] PUBLIC_URLS = {
            "/api/auth/**",
            "/api/public/**",
            "/api/oauth2/**",
            "/actuator/**",
            "/swagger-ui/**",
            "/v3/api-docs/**"
    };
    
    // OAuth2 related constants
    public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    public static final int COOKIE_EXPIRE_SECONDS = 180;
    
    private AppConstants() {
        // Private constructor to prevent instantiation
    }
}