package com.backendalikin.security;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    
    private final Map<String, Instant> blacklistedTokens = new ConcurrentHashMap<>();

    /**
     * Añade un token a la blacklist
     * @param token El token a invalidar
     * @param expiryDate Fecha de expiración del token
     */
    public void blacklistToken(String token, Instant expiryDate) {
        blacklistedTokens.put(token, expiryDate);
        cleanupExpiredTokens();
    }

    /**
     * Verifica si un token está en la blacklist
     * @param token El token a verificar
     * @return true si el token está invalidado, false en caso contrario
     */
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.containsKey(token);
    }

    /**
     * Limpia tokens expirados de la blacklist
     */
    private void cleanupExpiredTokens() {
        Instant now = Instant.now();
        blacklistedTokens.entrySet().removeIf(entry -> entry.getValue().isBefore(now));
    }
}