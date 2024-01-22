package com.dgrytsyna.beautybar.service;

import com.dgrytsyna.beautybar.dto.EmployeeDTO;
import com.dgrytsyna.beautybar.entity.Account;
import com.dgrytsyna.beautybar.entity.Employee;
import com.dgrytsyna.beautybar.exception.*;
import com.dgrytsyna.beautybar.mapper.EmployeeMapper;
import com.dgrytsyna.beautybar.repository.AccountRepository;
import com.dgrytsyna.beautybar.repository.EmployeeRepository;
import com.dgrytsyna.beautybar.request.EmployeeAddRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.dgrytsyna.beautybar.entity.enums.EnumRole.ROLE_EMPLOYEE;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;
    private AccountRepository accountRepository;


    private PasswordEncoder encoder;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, AccountRepository accountRepository, PasswordEncoder encoder) {
        this.employeeRepository = employeeRepository;
        this.accountRepository = accountRepository;
        this.encoder = encoder;
    }


    public List<EmployeeDTO> getAllEmployees(){
        List<Employee> employees = employeeRepository.findAll(Sort.by("account.name", "account.surname"));
        return EmployeeMapper.INSTANCE.employeeToDTOList(employees);
    }

    public EmployeeDTO updateEmployee(EmployeeDTO employeeDTO){
        Optional<Employee> employeeOptional = employeeRepository.findById(employeeDTO.getId());
        if(employeeOptional.isEmpty()) throw new NotFoundException();
        try {
            Employee employee = employeeOptional.get();
            Account account = employee.getAccount();
            account.setTel(employeeDTO.getTel());
            account.setName(employeeDTO.getName());
            account.setSurname(employeeDTO.getSurname());
            accountRepository.save(account);
            employee.setStartTime(employeeDTO.getStartTime());
            employee.setEndTime(employeeDTO.getEndTime());
            employee.setWorkStatus(employeeDTO.getWorkStatus());
            employee.setWorkType(employeeDTO.getWorkType());
            employee.setImg(Optional.ofNullable(employeeDTO.getImg()).orElse(employee.getImg()));
            employeeRepository.save(employee);
            EmployeeDTO employeeDTOUpdate = EmployeeMapper.INSTANCE.employeeToDTO(employee);
            return employeeDTOUpdate;
        }catch (Exception e){
            throw new CouldNotUpdateException();
        }

    }
    public Employee saveEmployee(EmployeeAddRequest employeeAddRequest) throws UserExistsException {
        if (accountRepository.existsByEmail(employeeAddRequest.getEmail())) throw new UserExistsException();
        Account user = new Account( employeeAddRequest.getEmail(),
                encoder.encode(employeeAddRequest.getPassword()), employeeAddRequest.getTel(),
                employeeAddRequest.getName(), employeeAddRequest.getSurname(), ROLE_EMPLOYEE);
        accountRepository.save(user);

        Optional<Account> employeeAccount = accountRepository.findByEmail(employeeAddRequest.getEmail());
        if(employeeAccount.isEmpty()) throw new CouldNotCreateException();
        try {
            Employee newEmployee = Employee.builder()
                    .account(employeeAccount.get())
                    .workType(employeeAddRequest.getWorkType())
                    .workStatus(employeeAddRequest.getWorkStatus())
                    .img(employeeAddRequest.getImg())
                    .startTime(employeeAddRequest.getStartTime())
                    .endTime(employeeAddRequest.getEndTime()).build();
            employeeRepository.save(newEmployee);
            return newEmployee;
        }catch (Exception e) {throw new CouldNotCreateException();}
    }

    public void deleteEmployee(Integer employeeId){
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if(employee.isEmpty()){
            throw new NotFoundException();
        }
        Account account = employee.get().getAccount();
        try {
            employeeRepository.delete(employee.get());
            accountRepository.delete(account);
        }catch (Exception e){throw new CouldNotDeleteException();}
    }
}
