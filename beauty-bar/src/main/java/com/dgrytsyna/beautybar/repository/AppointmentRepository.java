package com.dgrytsyna.beautybar.repository;
import com.dgrytsyna.beautybar.entity.Appointment;
import com.dgrytsyna.beautybar.entity.Receipt;
import com.dgrytsyna.beautybar.entity.enums.AppointmentStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    @Query("SELECT a FROM Appointment a WHERE DATE(a.appointmentDate) = DATE(:selectedDate) AND a.employee.id=(:employeeId) AND a.appointmentStatus=(:appointmentStatus)")
    List<Appointment> findByEmployeeIdAndDateAndAppointmentStatus(@Param("selectedDate") LocalDate selectedDate,@Param("employeeId") Integer employeeId,
                                                                  @Param("appointmentStatus") AppointmentStatus appointmentStatus);
    List<Appointment> findByClientIdAndAppointmentStatus(Integer id, AppointmentStatus status, Sort sort);
    Appointment findByReceipt(Receipt receipt);
    @Query("SELECT a FROM Appointment a WHERE DATE(a.appointmentDate) = DATE(:selectedDate)")
    List<Appointment> findByDate(@Param("selectedDate") LocalDate selectedDate, Sort sort);

    @Query("SELECT a FROM Appointment a WHERE DATE(a.appointmentDate) = DATE(:selectedDate) AND a.employee.account.email = (:employee)")
    List<Appointment> findByDateAndEmployeeEmail(@Param("selectedDate") LocalDate selectedDate, @Param("employee") String employee, Sort sort);
}
