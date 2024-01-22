class EmployeeAppointmentInfoModel {
    appointmentTime: string[];
    employeeName: string;
    employeeSurname: string;
    employeeId: number;
    image:Uint8Array;
  
    constructor(appointmentTime: string[], employeeName: string, employeeSurname: string, emploteeId: number, image: Uint8Array) {
      this.appointmentTime = appointmentTime;
      this.employeeName = employeeName;
      this.employeeSurname = employeeSurname;
      this.employeeId = emploteeId;
      this.image = image;
    }
  }
  export default EmployeeAppointmentInfoModel;