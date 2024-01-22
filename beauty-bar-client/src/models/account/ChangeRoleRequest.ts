class ChangeRoleRequest{
    id:number;
    admin:boolean;
    constructor(
        id:number,
        admin:boolean
    ){
        this.id = id;
        this.admin = admin;
    }
}