package com.dgrytsyna.beautybar.mapper;
import com.dgrytsyna.beautybar.dto.UserAppointmentDTO;
import com.dgrytsyna.beautybar.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.ArrayList;
import java.util.List;

@Mapper
public interface UserAppointmentMapper {
    UserAppointmentMapper INSTANCE = Mappers.getMapper(UserAppointmentMapper.class);
    @Mapping(target = "employeeName", source = "employee.account.name")
    @Mapping(target = "employeeSurname", source = "employee.account.surname")
    @Mapping(target = "procedureName", source = "procedure.name")
    @Mapping(target = "procedureDescription", source = "procedure.description")
    @Mapping(target = "price", source = "receipt.totalAmount")
    UserAppointmentDTO appointmentToUserAppointmentDTO(Appointment appointment);
    default List<UserAppointmentDTO> appointmentToUserAppointmentDTOs(List<Appointment> appointments) {
        List<UserAppointmentDTO> userAppointmentDTOS = new ArrayList<>();
        for (Appointment appointment : appointments) {
            UserAppointmentDTO userAppointmentDTO = appointmentToUserAppointmentDTO(appointment);
            userAppointmentDTOS.add(userAppointmentDTO);
        }
        return userAppointmentDTOS;
    }
}
