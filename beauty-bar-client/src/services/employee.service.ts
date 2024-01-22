import api from "./api";

const getAllEmployees= () => {
    return api.get("/admin/employee");
    
  };
const editEmpoyee = (employeeId: number, data: EmployeeModel) =>{
    return api.put("/admin/employee/" + employeeId,  data);
}

const addEmployee = (data: EmployeeAddRequest) =>{
  return api.post("/admin/employee", data);
}
const deleteEmployee = (id: number) =>{
  return api.delete("/admin/employee/" + id);
}
  const EmployeeService = {
    getAllEmployees,
    addEmployee,
    editEmpoyee,
    deleteEmployee
  };
  export default EmployeeService;