package com.dgrytsyna.beautybar.security.auth;

import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.RefreshToken;
import com.dgrytsyna.beautybar.entity.enums.EnumRole;
import com.dgrytsyna.beautybar.exception.TokenRefreshException;
import com.dgrytsyna.beautybar.repository.AccountRepository;
import com.dgrytsyna.beautybar.security.auth.payload.request.LoginRequest;
import com.dgrytsyna.beautybar.security.auth.payload.request.SignUpRequest;
import com.dgrytsyna.beautybar.security.auth.payload.request.TokenRefreshRequest;
import com.dgrytsyna.beautybar.security.auth.payload.response.JwtResponse;
import com.dgrytsyna.beautybar.security.auth.payload.response.MessageResponse;
import com.dgrytsyna.beautybar.security.auth.payload.response.TokenRefreshResponse;
import com.dgrytsyna.beautybar.security.jwt.JwtUtils;
import com.dgrytsyna.beautybar.security.service.RefreshTokenService;
import com.dgrytsyna.beautybar.security.service.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import static com.dgrytsyna.beautybar.entity.enums.EnumRole.ROLE_ADMIN;
import static com.dgrytsyna.beautybar.entity.enums.EnumRole.ROLE_USER;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;

    AccountRepository accountRepository;

    PasswordEncoder encoder;

    RefreshTokenService refreshTokenService;

    JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, AccountRepository accountRepository, PasswordEncoder encoder, RefreshTokenService refreshTokenService, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.accountRepository = accountRepository;
        this.encoder = encoder;
        this.refreshTokenService = refreshTokenService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt,  userDetails.getId(),
                 userDetails.getUsername(), roles.get(0), refreshToken.getToken()));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getEmail(), "[" + user.getAccRole().toString() + "]");
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser( @RequestBody SignUpRequest signUpRequest) {
        if (accountRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: email is already taken!"));
        }
        List<Account> accountList = accountRepository.findAll();
        EnumRole role = ROLE_USER;
        if(accountList.isEmpty()) role = ROLE_ADMIN;
        Account user = new Account( signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getTel(),
                signUpRequest.getName(), signUpRequest.getSurname(), role);
        accountRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
