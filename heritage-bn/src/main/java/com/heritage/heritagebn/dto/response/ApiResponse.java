package com.heritage.heritagebn.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    private Boolean success;
    private String message;
    private Object data;
    
    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}