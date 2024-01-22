package com.dgrytsyna.beautybar.repository;
import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.enums.EnumRole;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);
    Boolean existsByEmail(String email);

    List<Account> findAllByAccRoleOrAccRole(EnumRole roleAdmin, EnumRole roleUser, Sort sort);
}
