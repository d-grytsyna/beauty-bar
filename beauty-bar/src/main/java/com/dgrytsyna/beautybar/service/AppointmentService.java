package com.dgrytsyna.beautybar.service;

import com.dgrytsyna.beautybar.dto.AdminAppointmentDTO;
import com.dgrytsyna.beautybar.dto.UserAppointmentDTO;
import com.dgrytsyna.beautybar.entity.*;
import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import com.dgrytsyna.beautybar.entity.enums.PaymentStatus;
import com.dgrytsyna.beautybar.exception.DataPersistenceException;
import com.dgrytsyna.beautybar.exception.NotFoundException;
import com.dgrytsyna.beautybar.exception.TimeNotFreeException;
import com.dgrytsyna.beautybar.mapper.AdminAppointmentMapper;
import com.dgrytsyna.beautybar.mapper.UserAppointmentMapper;
import com.dgrytsyna.beautybar.repository.*;
import com.dgrytsyna.beautybar.request.AppointmentAddRequest;
import com.dgrytsyna.beautybar.request.AppointmentStatusUpdateRequest;
import com.dgrytsyna.beautybar.request.PaymentStatusUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private AppointmentRepository appointmentRepository;

    private ReceiptRepository receiptRepository;

    private AccountRepository accountRepository;

    private ProcedureRepository procedureRepository;

    private EmployeeRepository employeeRepository;

    private ProcedureService procedureService;
    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, ReceiptRepository receiptRepository,
                              AccountRepository accountRepository,
                              ProcedureRepository procedureRepository,
                              EmployeeRepository employeeRepository,
                              ProcedureService procedureService) {
        this.appointmentRepository = appointmentRepository;
        this.receiptRepository = receiptRepository;
        this.accountRepository = accountRepository;
        this.procedureRepository = procedureRepository;
        this.employeeRepository = employeeRepository;
        this.procedureService = procedureService;
    }

    public Appointment addAppointment(AppointmentAddRequest appointmentAddRequest, String username){
        Optional<Account> client = accountRepository.findByEmail(username);
        Optional<Procedure> procedure = procedureRepository.findById(appointmentAddRequest.getProcedureId());
        Optional<Employee> employee = employeeRepository.findById(appointmentAddRequest.getEmployeeId());
        LocalTime lt = LocalTime.parse (procedure.get().getTime());
        Duration procedureDuration = Duration.between ( LocalTime.MIN , lt );
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d");
        List<Appointment> employeeAppointments = appointmentRepository.findByEmployeeIdAndDateAndAppointmentStatus(LocalDate.parse(appointmentAddRequest.getDate(), formatter), employee.get().getId(), AppointmentStatus.ASSIGNED);
        List<LocalTime> employeeFreeTimes = procedureService.findEmployeeFreeTime(employee.get(), employeeAppointments,procedureDuration, LocalDate.parse(appointmentAddRequest.getDate(), formatter));
        Boolean isTimeFree = false;
        for(LocalTime employeeTime: employeeFreeTimes){
            if(employeeTime.equals(LocalTime.parse(appointmentAddRequest.getStartTime()))) isTimeFree = true;
        }
        if(!isTimeFree) throw new TimeNotFreeException();
        if(client.isPresent() && procedure.isPresent() && isTimeFree){
            Double totalPrice = procedure.get().getPrice();
            if(procedure.get().getDiscount()!=0) totalPrice = Math.floor(totalPrice * (100-procedure.get().getDiscount())/100);
            Receipt receipt = new Receipt(client.get(), totalPrice, PaymentStatus.UNPAID, appointmentAddRequest.getPayment());
            Receipt savedReceipt = receiptRepository.save(receipt);
            String dateString = appointmentAddRequest.getDate();
            String timeString = appointmentAddRequest.getStartTime();
            String dateTimeString = dateString + " " + timeString;
            Timestamp timestamp = parseStringToTimestamp(dateTimeString);
            Appointment appointment = new Appointment(client.get(),employee.get(),procedure.get(),savedReceipt, timestamp, AppointmentStatus.ASSIGNED);
            appointmentRepository.save(appointment);
            return appointment;
        }
        return null;

    }

    private static Timestamp parseStringToTimestamp(String dateTimeString) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            Date parsedDate = dateFormat.parse(dateTimeString);
            return new Timestamp(parsedDate.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<UserAppointmentDTO> getAppointments(String username){
        List<UserAppointmentDTO> appointmentDTOS = new ArrayList<>();
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isPresent()){
            List<Appointment> appointments = appointmentRepository.findByClientIdAndAppointmentStatus(user.get().getId(), AppointmentStatus.ASSIGNED,  Sort.by("appointmentDate"));
            appointmentDTOS = UserAppointmentMapper.INSTANCE.appointmentToUserAppointmentDTOs(appointments);
            return  appointmentDTOS;

        }
        return appointmentDTOS;
    }

    public List<UserAppointmentDTO> getAppointmentsHistory(String username){
        List<UserAppointmentDTO> appointmentDTOS = new ArrayList<>();
        Optional<Account> user = accountRepository.findByEmail(username);
        if(user.isPresent()){
            List<Appointment> appointments = appointmentRepository.findByClientIdAndAppointmentStatus(user.get().getId(), AppointmentStatus.DONE, Sort.by("appointmentDate"));
            appointmentDTOS = UserAppointmentMapper.INSTANCE.appointmentToUserAppointmentDTOs(appointments);
            return  appointmentDTOS;

        }
        return appointmentDTOS;
    }

    public List<AdminAppointmentDTO> getAppointmentsOnDate(LocalDate date){
        List<Appointment> appointments = appointmentRepository.findByDate(date,Sort.by("appointmentDate") );
        List<AdminAppointmentDTO> appointmentDTOS = AdminAppointmentMapper.INSTANCE.appointmentToAdminAppointmentDtoList(appointments);
        return appointmentDTOS;
    }

    public Appointment updateAppointmentStatus(AppointmentStatusUpdateRequest appointmentStatusUpdateRequest){
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentStatusUpdateRequest.getId());
        if(appointment.isEmpty()){
            throw new NotFoundException();
        }
        appointment.get().setAppointmentStatus(appointmentStatusUpdateRequest.getStatus());
        try {
            appointmentRepository.save(appointment.get());
        }catch (Exception e) {throw new DataPersistenceException();}
        return appointment.get();
    }

    public void updatePaymentStatus(PaymentStatusUpdateRequest paymentStatusUpdateRequest){
        Optional<Appointment> appointment = appointmentRepository.findById(paymentStatusUpdateRequest.getId());
        if(appointment.isEmpty()) throw new NotFoundException();
        try {
            appointment.get().getReceipt().setPaymentStatus(paymentStatusUpdateRequest.getStatus());
            appointmentRepository.save(appointment.get());
        }catch (Exception e) {throw new DataPersistenceException();}

    }

    public List<AdminAppointmentDTO> getEmployeeAppointments(String username, LocalDate date){
        List<Appointment> appointments = appointmentRepository.findByDateAndEmployeeEmail(date, username, Sort.by("appointmentDate"));
        List<AdminAppointmentDTO> appointmentDTOS = AdminAppointmentMapper.INSTANCE.appointmentToAdminAppointmentDtoList(appointments);
        return appointmentDTOS;
    }
}
