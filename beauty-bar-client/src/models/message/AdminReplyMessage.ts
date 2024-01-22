class AdminReplyMessage{
    id?: number;
    response?: string;
    constructor(
        id: number,
        response: string
    ){
        this.id = id;
        this.response = response;
    }
}