package com.dgrytsyna.beautybar.security.service;

import com.dgrytsyna.beautybar.entity.RefreshToken;
import com.dgrytsyna.beautybar.exception.TokenRefreshException;
import com.dgrytsyna.beautybar.repository.AccountRepository;
import com.dgrytsyna.beautybar.repository.RefreshTokenRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    @Value("${beautybar.app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    private RefreshTokenRepository refreshTokenRepository;

    private AccountRepository userRepository;

    @Autowired
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, AccountRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(Integer userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            try{
                refreshTokenRepository.delete(token);
            }catch (Exception e){
                throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
            }
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    @Transactional
    public int deleteByUserId(Integer userId) {
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }
}