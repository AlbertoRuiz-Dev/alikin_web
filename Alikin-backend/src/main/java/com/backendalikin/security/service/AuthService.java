package com.backendalikin.security.service;

import com.backendalikin.dto.request.LoginRequest;
import com.backendalikin.dto.request.SignupRequest;
import com.backendalikin.dto.response.AuthResponse;
import com.backendalikin.dto.response.MessageResponse;
import com.backendalikin.entity.UserEntity;
import com.backendalikin.model.enums.Role;
import com.backendalikin.repository.UserRepository;
import com.backendalikin.security.service.CustomUserDetailsService;
import com.backendalikin.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;

    public MessageResponse registerUser(SignupRequest signupRequest) {
        
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }

        if (userRepository.existsByNickname(signupRequest.getNickname())) {
            throw new RuntimeException("El nickname ya está en uso");
        }

        
        UserEntity user = new UserEntity();
        user.setName(signupRequest.getName());
        user.setLastName(signupRequest.getLastName());
        user.setNickname(signupRequest.getNickname());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRole(Role.USER); 
        user.setEmailVerified(false); 
        user.setProfilePictureUrl(null); 

        
        userRepository.save(user);

        return new MessageResponse("Usuario registrado exitosamente");
    }

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        
        org.springframework.security.core.userdetails.UserDetails userDetails =
                (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();

        
        String jwt = tokenProvider.generateToken(userDetails);

        
        UserEntity user = userDetailsService.getUserEntityByUsernameOrEmail(loginRequest.getUsernameOrEmail());

        
        return AuthResponse.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .role(user.getRole().name())
                .build();
    }
}