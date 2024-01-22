package com.dgrytsyna.beautybar.request;

import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import lombok.Data;

@Data
public class AppointmentStatusUpdateRequest {
    private Integer id;
    private AppointmentStatus status;
}
