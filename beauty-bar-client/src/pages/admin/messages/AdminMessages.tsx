import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import MessageService from "../../../services/message.service";
import { Loading } from "../../../utils/Loading";

export const AdminMessages = () => {
  const [pendingMessages, setPendingMessages] = useState<PendingMessageModel[]>([]);
  const [adminReply, setAdminReply] = useState<AdminReplyMessage>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateForm(name, value);

    setAdminReply((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (name: string, value: any): boolean => {
    switch (name) {
      case "response":
        if (value.trim().length <= 10 || value.trim().length > 300) {
          setError("Response must be more than 10 characters and up to 300");
          return false;
        } else setError("");
        break;
      default:
        break;
    }
    setError("");
    return true;
  };
  useEffect(() => {
    MessageService.getPendingMessages().then(
      (response) => {
        setPendingMessages(response.data);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        const _content = history.push("/error");
      }
    );
  }, [adminReply]);
  const handleCancel = () =>{
    setAdminReply(undefined);
  }
  const handleReply = (currentId: number) =>{
    setAdminReply({
      id: currentId,
      response: undefined
    })
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let isValid = true;
    if (!adminReply) {return false;}
    for (const [name, value] of Object.entries(adminReply)) {
      const isFieldValid = validateForm(name, value);
      if (!isFieldValid) {
        isValid = false;
        break; 
      }
    }
    if(isValid){
    try {
      if (adminReply) await MessageService.sendReply(adminReply);
      setAdminReply(undefined);
      alert("Response succesfully posted!")
    } catch (apiError: any) {
      if (apiError?.response?.status) {
        const statusCode = apiError.response.status;
        switch (statusCode) {
          case 400:
            alert("Invalid data is being added.");
            break;
          case 401:
            alert("Authorization token ended please sign in");
              break;
          default:
            alert("An error occurred while editing the procedure.");
        }
      } else {
        alert("An error occurred while editing the procedure.");
  
      }
    }}
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="container p-5">
      <h2>Pending messages:</h2>
      <div className="row">
       {pendingMessages && pendingMessages.map((pendingMessage) =>(
         <div className="col-12 procedure-info-row rounded background-container">
         <p className="text-size-20">From : {pendingMessage.email}</p>
         <h5>Contact info: {pendingMessage.name} {pendingMessage.surname} tel: {pendingMessage.tel}</h5>
         <h4> Title: {pendingMessage.title}</h4>
         <p> Message:
           {pendingMessage.message}
         </p>
         
         {!adminReply && <button
           className="btn main-btn main-element-colour secondary-colour mb-4" 
           onClick={() => handleReply(pendingMessage.id)}
         >
           Reply
         </button>}

         {adminReply?.id==pendingMessage.id && (
         <div>
          <form action=""
          onSubmit={handleSubmit}
          >
            <p>{error}</p>
          <div className="mb-3 col-6">
            <label htmlFor="response" className="form-label">
              Response:
            </label>
            <textarea id="response" name="response" className="form-control"
             onChange={handleInputChange} 
             style={{  maxHeight: '100px' }}
             value={adminReply.response}
             />
          </div>
          <button
           type="submit"
           className="btn main-btn main-element-colour secondary-colour mb-4" 
         >
           Save
         </button>
         <button
           className="btn accent-btn mb-4" 
           onClick={handleCancel}
         >
           Cancel
         </button>
          </form>

         </div>)
         }
         
       </div>
       )

       )}
      </div>
    </div>
  );
};
