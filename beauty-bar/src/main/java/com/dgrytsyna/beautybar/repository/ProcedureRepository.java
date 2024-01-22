package com.dgrytsyna.beautybar.repository;
import com.dgrytsyna.beautybar.entity.Procedure;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProcedureRepository extends JpaRepository<Procedure, Integer> {
    List<Procedure> findAll(Sort sort);
    List<Procedure> findAllByType(ProcedureType type);
}
