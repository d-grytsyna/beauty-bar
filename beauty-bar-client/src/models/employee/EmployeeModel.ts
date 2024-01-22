class EmployeeModel{
id: number;
  tel: string;
  name: string;
  surname: string;
  workType: string;
  workStatus: string; 
  img: any;
  startTime: string; 
  endTime: string;
  constructor(
    id: number,
    tel: string,
    name: string,
    surname: string,
    workType: string,
    workStatus: string,
    img: Uint8Array,
    startTime: string,
    endTime: string
  ) {
    this.id = id;
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