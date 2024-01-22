class UserAppointmentModel{
    employeeName: string;
    employeeSurname: string;
    procedureName: string;
    procedureDescription: string;
    price: number;
    appointmentDate: string;
    constructor(
    employeeName: string,
    employeeSurname: string,
    procedureName: string,
    procedureDescription: string,
    price: number,
    appointmentDate: string
    ){
        this.employeeName = employeeName;
        this.employeeSurname = employeeSurname;
        this.procedureName = procedureName;
        this.procedureDescription = procedureDescription;
        this.price = price;
        this.appointmentDate = appointmentDate;
    }

}
export default UserAppointmentModel;