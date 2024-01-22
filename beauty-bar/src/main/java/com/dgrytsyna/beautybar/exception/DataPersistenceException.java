package com.dgrytsyna.beautybar.exception;

import lombok.experimental.StandardException;
import org.springframework.dao.DataAccessException;

@StandardException
public class DataPersistenceException extends DataAccessException {
    private Long enteredId;
    private String message;
}
