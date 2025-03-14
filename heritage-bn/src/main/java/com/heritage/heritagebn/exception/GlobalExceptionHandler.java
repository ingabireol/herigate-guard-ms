package com.heritage.heritagebn.exception;

import com.heritage.heritagebn.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        log.error("Resource not found exception: {}", ex.getMessage());
        ApiResponse apiResponse = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse> handleBadRequestException(BadRequestException ex, WebRequest request) {
        log.error("Bad request exception: {}", ex.getMessage());
        ApiResponse apiResponse = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse> handleAppException(AppException ex, WebRequest request) {
        log.error("Application exception: {}", ex.getMessage());
        ApiResponse apiResponse = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse> handleAuthenticationException(AuthenticationException ex, WebRequest request) {
        log.error("Authentication exception: {}", ex.getMessage());
        ApiResponse apiResponse = new ApiResponse(false, "Authentication failed: " + ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
        log.error("Bad credentials exception: {}", ex.getMessage());
        ApiResponse apiResponse = new ApiResponse(false, "Invalid username or password");
        return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        log.error("Access denied exception: {}", ex.getMessage());
        ApiResponse apiResponse = new ApiResponse(false, "Access denied: You don't have permission to access this resource");
        return new ResponseEntity<>(apiResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, WebRequest request) {
        log.error("Validation error: {}", ex.getMessage());
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse apiResponse = new ApiResponse(false, "Validation error", errors);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
        log.error("Type mismatch error: {}", ex.getMessage());
        String error = String.format("Parameter '%s' should be a valid %s", ex.getName(), ex.getRequiredType().getSimpleName());
        ApiResponse apiResponse = new ApiResponse(false, error);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGlobalException(Exception ex, WebRequest request) {
        log.error("Unhandled exception: ", ex);
        ApiResponse apiResponse = new ApiResponse(false, "An unexpected error occurred");
        return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}