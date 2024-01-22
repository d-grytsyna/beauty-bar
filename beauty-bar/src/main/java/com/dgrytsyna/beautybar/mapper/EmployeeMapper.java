package com.dgrytsyna.beautybar.mapper;
import com.dgrytsyna.beautybar.dto.EmployeeDTO;
import com.dgrytsyna.beautybar.entity.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.ArrayList;
import java.util.List;

@Mapper
public interface EmployeeMapper {
    EmployeeMapper INSTANCE = Mappers.getMapper(EmployeeMapper.class);
    @Mapping(target = "tel", source = "account.tel")
    @Mapping(target = "name", source = "account.name")
    @Mapping(target = "surname", source = "account.surname")
    EmployeeDTO employeeToDTO(Employee employee);
    default List<EmployeeDTO> employeeToDTOList(List<Employee> employees) {
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();
        for (Employee employee : employees) {
            EmployeeDTO employeeDTO = employeeToDTO(employee);
            employeeDTOList.add(employeeDTO);
        }
        return employeeDTOList;
    }
}
