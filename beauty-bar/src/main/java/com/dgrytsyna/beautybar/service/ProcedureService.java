package com.dgrytsyna.beautybar.service;

import com.dgrytsyna.beautybar.dto.EmployeeAppointmentInfo;
import com.dgrytsyna.beautybar.dto.ProcedureAppointmentDTO;
import com.dgrytsyna.beautybar.entity.Appointment;
import com.dgrytsyna.beautybar.entity.Employee;
import com.dgrytsyna.beautybar.entity.Procedure;
import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.dgrytsyna.beautybar.entity.enums.WorkStatus;
import com.dgrytsyna.beautybar.exception.*;
import com.dgrytsyna.beautybar.repository.AppointmentRepository;
import com.dgrytsyna.beautybar.repository.EmployeeRepository;
import com.dgrytsyna.beautybar.repository.ProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Service
public class ProcedureService {
    private ProcedureRepository procedureRepository;

    private EmployeeRepository employeeRepository;

    private AppointmentRepository appointmentRepository;

    @Autowired
    public ProcedureService(ProcedureRepository procedureRepository, EmployeeRepository employeeRepository, AppointmentRepository appointmentRepository) {
        this.procedureRepository = procedureRepository;
        this.employeeRepository = employeeRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public Optional<Procedure> findProcedureById(Integer id){
        return procedureRepository.findById(id);
    }
    public List<Procedure> findAllProcedures(){
        return procedureRepository.findAll(Sort.by("name"));
    }


    public List<Procedure> findAllByType(String category) {
        category = category.toUpperCase();
        try {
            ProcedureType procedureType = ProcedureType.valueOf(category);
            return procedureRepository.findAllByType(procedureType);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }
    public ProcedureAppointmentDTO getAllAppointmentTime(String category, LocalDate date, Integer procedureId){

        List<Employee> employees = employeeRepository.findAllByWorkTypeAndWorkStatus(ProcedureType.valueOf(category.toUpperCase()), WorkStatus.AT_WORK);
        Optional<Procedure> procedure = procedureRepository.findById(procedureId);
        ProcedureAppointmentDTO procedureAppointmentDTO = new ProcedureAppointmentDTO();
        List<EmployeeAppointmentInfo> employeeAppointmentInfos = new ArrayList<>();
        LocalTime lt = LocalTime.parse (procedure.get().getTime());
        Duration procedureDuration = Duration.between ( LocalTime.MIN , lt );
        for(Employee employee: employees){
            List<Appointment> employeeAppointments = appointmentRepository.findByEmployeeIdAndDateAndAppointmentStatus(date, employee.getId(), AppointmentStatus.ASSIGNED);
            List<LocalTime> appointmentTime = findEmployeeFreeTime(employee, employeeAppointments, procedureDuration, date);
            if(!appointmentTime.isEmpty()){
                EmployeeAppointmentInfo employeeAppointmentInfo = new EmployeeAppointmentInfo();
                employeeAppointmentInfo.setAppointmentTime(appointmentTime);
                employeeAppointmentInfo.setEmployeeName(employee.getAccount().getName());
                employeeAppointmentInfo.setEmployeeSurname(employee.getAccount().getSurname());
                employeeAppointmentInfo.setImage(employee.getImg());
                employeeAppointmentInfo.setEmployeeId(employee.getId());
                employeeAppointmentInfos.add(employeeAppointmentInfo);
            }
        }
        procedureAppointmentDTO.setEmployeeAppointment(employeeAppointmentInfos);
        procedureAppointmentDTO.setDate(date);
        procedureAppointmentDTO.setProcedureName(procedure.get().getName());
        procedureAppointmentDTO.setProcedureId(procedure.get().getId());
        procedureAppointmentDTO.setPrice(procedure.get().getPrice());
        procedureAppointmentDTO.setDiscount(procedure.get().getDiscount());
        procedureAppointmentDTO.setEstimatedTime(procedure.get().getTime());
        return procedureAppointmentDTO;
    }
    public List<LocalTime> findEmployeeFreeTime(Employee employee, List<Appointment> appointments, Duration procedureEstimatedTime, LocalDate date){
        List<LocalTime> freeTimes = new ArrayList<>();

        int requiredTimeBlocks = (int) Math.ceil(procedureEstimatedTime.toMinutes() / 30.0);
        Map<LocalTime, LocalTime> bookedSlots = new HashMap<>();
        for (Appointment appointment : appointments) {
            LocalTime appointmentStartTime = appointment.getAppointmentDate().toLocalDateTime().toLocalTime();
            LocalTime lt = LocalTime.parse (appointment.getProcedure().getTime());
            Duration duration = Duration.between ( LocalTime.MIN , lt );
            int appointmentDurationBlocks = (int) Math.ceil(duration.toMinutes() / 30.0);
            LocalTime appointmentEndTime = appointmentStartTime.plusMinutes(30 * appointmentDurationBlocks);
            bookedSlots.put(appointmentStartTime, appointmentEndTime);
        }
        LocalTime currentSlot = employee.getStartTime();
        while (!currentSlot.isAfter(employee.getEndTime().minusMinutes(30*requiredTimeBlocks))) {
            boolean slotAvailable = true;
            if(date.equals(LocalDate.now()) &&currentSlot.isBefore(LocalTime.now())) {
                currentSlot = currentSlot.plusMinutes(30);
                continue;
            }
            for (int i = 0; i < requiredTimeBlocks; i++) {
                LocalTime currentBlock = currentSlot.plusMinutes(30 * i);
                if (isOverlap( currentBlock, bookedSlots)) {
                    slotAvailable = false;
                    break;
                }
            }
            if (slotAvailable) {
                freeTimes.add(currentSlot);
            }
            currentSlot = currentSlot.plusMinutes(30);
        }

        return freeTimes;
    }
    private boolean isOverlap(LocalTime currentBlock, Map<LocalTime, LocalTime> bookedSlots) {
        for (Map.Entry<LocalTime, LocalTime> entry : bookedSlots.entrySet()) {
            LocalTime bookedStartTime = entry.getKey();
            LocalTime bookedEndTime = entry.getValue();
            if (currentBlock.equals(bookedStartTime)|| currentBlock.isAfter(bookedStartTime) && currentBlock.isBefore(bookedEndTime)) {
                return true;
            }
        }
        return false;
    }

    public Procedure updateProcedure(Procedure procedure){
        Optional<Procedure> procedure1 = procedureRepository.findById(procedure.getId());
        if(procedure1.isPresent()) {
            try {
                procedure1.get().setName(procedure.getName());
                procedure1.get().setType(procedure.getType());
                procedure1.get().setDescription(procedure.getDescription());
                procedure1.get().setTime(procedure.getTime());
                procedure1.get().setPrice(procedure.getPrice());
                procedure1.get().setDiscount(procedure.getDiscount());
                procedure1.get().setImg(Optional.ofNullable(procedure.getImg()).orElse(procedure1.get().getImg()));
                procedureRepository.save(procedure1.get());
                return procedure1.get();
            }catch (DataPersistenceException e) {
                throw new CouldNotUpdateException();
            }

        }else throw new NotFoundException();
    }

    public Procedure addProcedure(Procedure procedure){
        try {
            Procedure procedure1 = procedureRepository.save(procedure);
            return procedure1;
        }catch (DataPersistenceException e){
            throw new CouldNotCreateException("Could not create the procedure");
        }
    }

    public void deleteProcedure(Integer id){
        Procedure procedure = procedureRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Procedure not found with id: " + id));
        try {
            procedureRepository.delete(procedure);
        } catch (DataAccessException e) {
            throw new CouldNotDeleteException("Could not delete procedure with id: " + id, e);
        }
    }

}
