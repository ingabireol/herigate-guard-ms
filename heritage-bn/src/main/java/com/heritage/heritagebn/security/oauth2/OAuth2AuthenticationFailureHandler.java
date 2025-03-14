package com.heritage.heritagebn.security.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Value("${app.oauth2.authorizedRedirectUris:http://localhost:3000/oauth2/redirect}")
    private String defaultRedirectUri;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, 
                                       AuthenticationException exception) throws IOException, ServletException {
        String targetUrl = getRedirectUriFromCookie(request).orElse(defaultRedirectUri);

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        // Clear the redirect_uri cookie
        Cookie cookie = new Cookie("redirect_uri", "");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private java.util.Optional<String> getRedirectUriFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("redirect_uri")) {
                    return java.util.Optional.of(cookie.getValue());
                }
            }
        }
        return java.util.Optional.empty();
    }
}