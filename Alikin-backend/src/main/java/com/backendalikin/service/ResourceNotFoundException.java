package com.backendalikin.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Excepción personalizada para indicar que un recurso no fue encontrado.
 * Al anotarla con @ResponseStatus(HttpStatus.NOT_FOUND), Spring Boot
 * devolverá automáticamente un error 404 cuando se lance esta excepción.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    /**
     * Constructor que acepta un mensaje de error.
     * @param message El mensaje que detalla el error.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructor que acepta un mensaje y la causa original de la excepción.
     * @param message El mensaje que detalla el error.
     * @param cause La excepción original que se encadena.
     */
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
