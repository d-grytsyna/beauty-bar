package com.dgrytsyna.beautybar.mapper;
import com.dgrytsyna.beautybar.dto.AdminAppointmentDTO;
import com.dgrytsyna.beautybar.entity.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.ArrayList;
import java.util.List;

@Mapper
public interface AdminAppointmentMapper {


    AdminAppointmentMapper INSTANCE = Mappers.getMapper(AdminAppointmentMapper.class);

    @Mapping(target = "clientTel", source = "client.tel")
    @Mapping(target = "clientName", source = "client.name")
    @Mapping(target = "clientSurname", source = "client.surname")
    @Mapping(target = "clientEmail", source = "client.email")
    @Mapping(target = "employeeName", source = "employee.account.name")
    @Mapping(target = "employeeSurname", source = "employee.account.surname")
    @Mapping(target = "procedureName", source = "procedure.name")
    @Mapping(target = "price", source = "receipt.totalAmount")
    @Mapping(target = "paymentStatus", source = "receipt.paymentStatus")
    AdminAppointmentDTO appointmentToAdminAppointmentDto(Appointment appointment);

    default List<AdminAppointmentDTO> appointmentToAdminAppointmentDtoList(List<Appointment> appointments) {
        List<AdminAppointmentDTO> appointmentDTOS = new ArrayList<>();
        for (Appointment appointment : appointments) {
            AdminAppointmentDTO adminAppointmentDTO = appointmentToAdminAppointmentDto(appointment);
            appointmentDTOS.add(adminAppointmentDTO);
        }
        return appointmentDTOS;
    }
}
