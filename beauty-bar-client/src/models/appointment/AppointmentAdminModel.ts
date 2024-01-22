class AppointmentAdminModel{
    id: number;
    clientTel: string;
    clientName: string;
    clientSurname: string;
    clientEmail: string;
    employeeName: string;
    employeeSurname: string;
    appointmentDate: string;
    appointmentStatus: string;
    procedureName: string;
    price: number;
    paymentStatus: string;

    constructor(
        id: number,
        clientTel: string,
        clientName: string,
        clientSurname: string,
        clientEmail: string,
        employeeName: string,
        employeeSurname: string,
        appointmentDate: string,
        appointmentStatus: string,
        procedureName: string,
        price: number,
        paymentStatus: string
    ){
        this.id = id;
        this.clientTel = clientTel;
        this.clientName = clientName;
        this.clientSurname = clientSurname;
        this.clientEmail = clientEmail;
        this.price = price;
        this.employeeName = employeeName;
        this.employeeSurname = employeeSurname;
        this.appointmentDate = appointmentDate;
        this.appointmentStatus = appointmentStatus;
        this.procedureName = procedureName;
        this.paymentStatus = paymentStatus;
    }
}