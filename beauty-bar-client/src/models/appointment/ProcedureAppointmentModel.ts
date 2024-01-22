import EmployeeAppointmentInfoModel from "../employee/EmployeeAppointmentInfoModel";
class ProcedureAppointmentModel {
    employeeAppointment: EmployeeAppointmentInfoModel[];
    date: string; // Assuming date is a string in 'YYYY-MM-DD' format
    procedureName: string;
    procedureId: number;
    price: number;
    discount: number;
    estimatedTime: string;
    constructor(employeeAppointment: EmployeeAppointmentInfoModel[], date: string,
      procedureName: string, procedureId:number, price: number, estimatedTime: string,
      discount: number) {
      this.employeeAppointment = employeeAppointment;
      this.date = date;
      this.procedureName = procedureName;
      this.procedureId = procedureId;
      this.price = price;
      this.estimatedTime = estimatedTime;
      this.discount = discount;
    }
  }
  export default ProcedureAppointmentModel;