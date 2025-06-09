package com.backendalikin.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class SongRequest {
    @NotBlank(message = "El título es obligatorio")
    private String title;
    
    @NotBlank(message = "El artista es obligatorio")
    private String artist;
    
    private String album;

    private List<String> genres; 
}