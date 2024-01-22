class ProfileUpdateModel{
    name?: string;
    surname?: string;
    tel?: string;
    constructor(
    name: string,
    surname: string,
    tel: string
    ){
        this.name = name;
        this.surname = surname;
        this.tel = tel;
    }
}