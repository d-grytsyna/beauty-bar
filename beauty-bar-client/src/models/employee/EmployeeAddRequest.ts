class EmployeeAddRequest{
    email?: string;
    password?: string;
    tel?: string;
    name?: string;
    surname?: string;
    workType?: string;
    workStatus?: string; 
    img?: any;
    startTime?: string; 
    endTime?: string;
    
    constructor(email: string, password: string, tel: string, name: string, surname: string,
        workType: string, workStatus: string, img: any, startTime: string, endTime: string){
            this.email = email;
            this.password = password;
            this.tel = tel;
            this.name = name;
            this.surname = surname;
            this.workType = workType;
            this.workStatus = workStatus;
            this.img = img;
            this.startTime = startTime;
            this.endTime = endTime;
        }
}