package com.dgrytsyna.beautybar.advice;

import com.dgrytsyna.beautybar.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({CouldNotCreateException.class,
            CouldNotUpdateException.class,
            CouldNotDeleteException.class,
            CustomDataAccessException.class,
            IOException.class,
            })
    public ResponseEntity<ErrorMessage> handleCarDataPersistenceException(DataPersistenceException e){

        ErrorMessage errorInfo = new ErrorMessage();
        errorInfo.setMessage(e.getMessage());
        errorInfo.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorInfo.setTimestamp(new Date());

        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorMessage> handleCarNotFoundException(NotFoundException e){
        ErrorMessage errorInfo = new ErrorMessage();
        errorInfo.setMessage(e.getMessage());
        errorInfo.setStatusCode(HttpStatus.NOT_FOUND.value());
        errorInfo.setTimestamp(new Date());
        return new ResponseEntity<>(errorInfo, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorMessage> handleIllegalArgumentException(Exception e) {
        ErrorMessage errorInfo = new ErrorMessage();
        errorInfo.setMessage(e.getMessage());
        errorInfo.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorInfo.setTimestamp(new Date());
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({UserExistsException.class,
    IncorectPasswordException.class,
    TimeNotFreeException.class})
    public ResponseEntity<ErrorMessage> handleExistsException(Exception e) {
        ErrorMessage errorInfo = new ErrorMessage();
        errorInfo.setMessage(e.getMessage());
        errorInfo.setStatusCode(HttpStatus.CONFLICT.value());
        errorInfo.setTimestamp(new Date());
        return new ResponseEntity<>(errorInfo, HttpStatus.CONFLICT);
    }

}
