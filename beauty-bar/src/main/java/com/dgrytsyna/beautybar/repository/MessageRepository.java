package com.dgrytsyna.beautybar.repository;

import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.Employee;
import com.dgrytsyna.beautybar.entity.Message;
import com.dgrytsyna.beautybar.entity.enums.ProcedureType;
import com.dgrytsyna.beautybar.entity.enums.WorkStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
   List<Message> findAll();

   List<Message> findAllByUser(Account user);

   List<Message> findAllByClosed(Boolean closed);
}