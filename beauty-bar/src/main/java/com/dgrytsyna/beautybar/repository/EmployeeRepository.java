package com.dgrytsyna.beautybar.repository;
import com.dgrytsyna.beautybar.entity.Employee;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.dgrytsyna.beautybar.entity.enums.WorkStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findAllByWorkTypeAndWorkStatus(ProcedureType workType, WorkStatus workStatus);
    List<Employee> findAll(Sort sort);
}