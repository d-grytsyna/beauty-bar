class AccountInfoModel{
    id: number;
    name: string;
    surname: string;
    tel: string;
    email: string;
    admin: boolean;

    constructor(
        id: number,
        name: string,
        surname: string,
        tel: string,
        email: string,
        admin: boolean
    ){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.tel = tel;
        this.email = email;
        this.admin = admin;
    }
}