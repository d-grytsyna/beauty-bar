import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import MessageService from "../../../services/message.service";
export const AddQuestion = () => {
  const [formData, setFormData] = useState<MessageRequestModel>({
    title: '',
    message: ''
  });
  const [error, setError] = useState('');
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateForm(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let isValid = true;
    if (!formData) {return false;}
    for (const [name, value] of Object.entries(formData)) {
      const isFieldValid = validateForm(name, value);
      if (!isFieldValid) {
        isValid = false;
        break; 
      }
    }
    if(isValid){
    try {
      if (formData) await MessageService.sendMessage(formData);

      setFormData({
        title: '',
        message: '',
      });
      alert("Message succesfully posted!")
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


  const validateForm = (name: string, value: any): boolean => {
    if (value === "" || value==null) {
      setError("All fields must be filled out.");
      return false;
    }
    switch (name) {
      case "title":
        if (
          value.trim().length <= 2 ||
          value.trim().length > 50 ||
          !/^[a-zA-Z\s]+$/.test(value.trim())
        ) {
          setError(
            "Title must be more than 2 characters, up to 50 and contain only letters."
          );
          return false;
        } else setError("");
        break;

      case "message":
        if (value.trim().length <= 10 || value.trim().length > 300) {
          setError("Message must be more than 10 characters and up to 300");
          return false;
        } else setError("");
        break;
      default:
        break;
    }
    setError("");
    return true;
  };
  return (
    <div className="row">
      <div className="col-12">
        <form className=" d-flex justify-content-center flex-column align-items-center"
         onSubmit={handleSubmit}
        >
          <h4 className="mt-5">My message: </h4>

          <p>{error}</p>
          <div className="mb-3 col-6">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
            />
            
          </div>

          <div className="mb-3 col-6">
            <label htmlFor="message" className="form-label">
              Question:
            </label>
            <textarea id="message" name="message" className="form-control"
             onChange={handleInputChange} 
             style={{  height: '100px' }}
             value={formData.message}
             />
          </div>

          <button type="submit" className="btn  main-btn accent-btn mt-4 mb-5">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
