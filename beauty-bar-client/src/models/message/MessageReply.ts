class MessageReply{
    title: string;
    message: string;
    response: string;
    adminEmail: string;

    constructor(
        title: string,
        message: string,
        response: string,
        adminEmail: string
    ){
        this.title = title;
        this.message = message; 
        this.response = response;
        this.adminEmail = adminEmail
    }
}