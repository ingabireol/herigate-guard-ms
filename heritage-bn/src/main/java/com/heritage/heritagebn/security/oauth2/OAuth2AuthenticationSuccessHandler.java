package com.heritage.heritagebn.security.oauth2;

import com.heritage.heritagebn.security.CustomUserDetails;
import com.heritage.heritagebn.security.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;

    @Value("${app.oauth2.authorizedRedirectUris:http://localhost:3000/oauth2/redirect}")
    private String defaultRedirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            log.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = getRedirectUriFromCookie(request);

        String targetUrl = redirectUri.orElse(defaultRedirectUri);

        // Make sure the redirect URI is allowed
        if (!isValidRedirectUri(targetUrl)) {
            log.error("Redirect URI is not valid: {}", targetUrl);
            targetUrl = defaultRedirectUri;
        }

        // Generate JWT token
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(userDetails);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();
    }

    private Optional<String> getRedirectUriFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("redirect_uri")) {
                    return Optional.of(cookie.getValue());
                }
            }
        }
        return Optional.empty();
    }

    private boolean isValidRedirectUri(String uri) {
        try {
            URI redirectUri = new URI(uri);
            // Add your validation logic here (e.g., whitelisted domains)
            // For simplicity, we'll just check if it's not null and has a host
            return redirectUri.getHost() != null;
        } catch (Exception e) {
            return false;
        }
    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);

        // Also clear the redirect_uri cookie
        Cookie cookie = new Cookie("redirect_uri", "");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}