import api from "./api";
const sendMessage = (data: MessageRequestModel) =>{
 return api.post("/message", data);
}

const getReplies = () =>{
  return api.get("/message/reply");
}

const getPendingMessages = () =>{
  return api.get("/admin/message");
}

const sendReply = (data: AdminReplyMessage) =>{
  return api.put("/admin/message", data);
}
const MessageService = {
    sendMessage,
    getReplies,
    getPendingMessages,
    sendReply
  };
  export default MessageService;