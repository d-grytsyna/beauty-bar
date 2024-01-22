class AppointmentConfirmModel{
    procedureId: number;
    date: string;
    employeeId: number;
    employeeName: string;
    employeeSurname: string;
    startTime: string;
    payment?: string;
    constructor(procedureId: number,
        date: string,
        employeeName: string,
        employeeId: number,
        employeeSurname: string,
        startTime: string, 
        payment: string
        ){
            this.procedureId = procedureId;
            this.date = date;
            this.employeeName = employeeName;
            this.employeeId = employeeId;
            this.employeeSurname = employeeSurname;
            this.startTime = startTime;
            this.payment = payment;
        }
}