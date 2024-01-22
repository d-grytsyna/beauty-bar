import { useState, useEffect } from "react";
import MessageService from "../../../services/message.service";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../utils/Loading";

export const UserReplies = () => {
  const [replies, setReplies] = useState<MessageReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    MessageService.getReplies().then(
      (response) => {
        setReplies(response.data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        const _content = history.push("/error");
      }
    );
  }, []);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="row g-0 mb-5">
      {replies &&
        replies.map((reply) => (
         
            
            <div className="col-12 procedure-info-row p-4">
                <h5>{reply.title}</h5>
                <p>{reply.message}</p>

                <hr />
               {reply.adminEmail!=null? (
                <div>
                    <h5>Reply from: {reply.adminEmail}</h5>
                    <p>Response message: {reply.response}</p>
                </div>
               ) : (
                <div>
                    <span>Waiting for a reply</span>
                </div>
               )}
              </div>
       

        ))}
    </div>
  );
};
