class PendingMessageModel{
    id: number;
    name: string;
    surname: string;
    tel: string;
    email: string;
    title: string;
    message: string;

    constructor(
        id: number,
        name: string,
    surname: string,
    tel: string,
    email: string,
    title: string,
    message: string
    ){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.tel = tel;
        this.email = email;
        this.title = title;
        this.message = message;
    }
}