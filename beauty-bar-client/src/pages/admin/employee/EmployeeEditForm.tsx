import React, { useState, ChangeEvent, FormEvent } from "react";
import TimeFormatService from "../../../utils/format.functions";
import EmployeeService from "../../../services/employee.service";



interface EmployeeEditFormProps {
  employee: EmployeeModel;
  onCancel: () => void;
}


const EmployeeEditForm: React.FC<EmployeeEditFormProps> = ({ employee, onCancel }) => {
  const [formData, setFormData] = useState<EmployeeModel>({
    id: employee.id,
    name: employee.name,
    surname: employee.surname,
    tel: employee.tel,
    workType: employee.workType,
    workStatus: employee.workStatus,
    startTime: TimeFormatService.formatTime(employee.startTime),
    endTime: TimeFormatService.formatTime(employee.endTime),
    img: employee.img,
  });
  const [error, setError] = useState<any>(null);

  const validateForm = (name: string, value: any): boolean => {

    if (value === '' || (value == null && name !== "img")) {
      setError("All fields must be filled out.");
      return false;
    }
  
      switch (name) {
        case 'name':

          if (value.length <= 2 || value.length>50 || !/^[a-zA-Z]+$/.test(value)) {
            setError('Name must be more than 2 characters and up to 50, contain only letters.');
            return false;
          }else setError('')
          break;
          
        case 'surname':
          // Surname validation logic
          if (value.length <= 2  || value.length>50 || !/^[a-zA-Z]+$/.test(value)) {
            setError('Surname must be more than 2 characters, up to 50 and contain only letters.');
            return false;
          }else setError('')
          break;
          
        case 'tel':
          // Telephone validation logic
          if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
            setError('Telephone must be in the format 000-000-0000.');
            return false;
          }else setError('')
          break;
          
        case 'startTime':
          let startMinutes = parseInt(value.split(':')[1]);
          if (value < '07:00' || value > '14:00') {
            setError('Work start time must be between 07:00 and 14:00.');
            return false;
          }else if(startMinutes !== 0 && startMinutes !== 30){
            setError('Work start time minutes must be either :00 or :30.');
            return false;
          }else setError('')
          break;
          
        case 'endTime':
          let endMinutes = parseInt(value.split(':')[1]);
          if (value < '15:00' || value > '21:00') {
            setError('Work end time must be between 15:00 and 21:00.');
            return false;
          }else if(endMinutes !== 0 && endMinutes !== 30){
            setError('Work start time minutes must be either :00 or :30.');
            return false;
          }else setError('')
          break;
          
          default: break;
       
         } 
         setError('');
         return true;
         
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    validateForm(name, value);
         setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



async function base64Convertion(e: any) {
  if (e.target.files[0]) {
      getBase64(e.target.files[0]);
  }
}

function getBase64(file: any) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
      setFormData(prev => ({ ...prev, img: reader.result?.toString().split(",")[1] }));
  }
  reader.onerror = function (error) {
  }
}
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  let isValid = true;
  if (!formData) {
      return false;
    }
  
    for (const [name, value] of Object.entries(formData)) {
      const isFieldValid = validateForm(name, value);
      if (!isFieldValid) {
        isValid = false;
        break;
      }
    }
  if(isValid){
  try {
    await EmployeeService.editEmpoyee(employee.id, formData);
    alert("Employee successfully edited!");
    onCancel();
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
          alert("An error occurred while adding the procedure.");
      }
    } else {
      alert("An error occurred while adding the procedure.");

    }
  }
}
  }
  return (
  
    <form onSubmit={handleSubmit} className="container my-4 d-flex justify-content-center flex-column align-items-center">
        <div className="row col-6">
          <h1>Edit employee</h1>
          {error && 
          <p>{error}</p>
          }
         
        <div className="mb-3 col-6">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
  
        <div className="mb-3 col-6">
          <label htmlFor="surname" className="form-label">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="workStatus" className="form-label">Work status:</label>
          <select
            id="workStatus"
            name="workStatus"
            value={formData.workStatus}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="AT_WORK">AT WORK</option>
            <option value="ON_VACATION">ON VACATION</option>
            <option value="ON_SICK_LEAVE">ON SICK LEAVE</option>
          </select>
        </div>
  
        <div className="mb-3">
          <label htmlFor="workType" className="form-label">Work type:</label>
          <select
            id="workType"
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="HAIR">HAIR</option>
            <option value="MAKEUP">MAKE-UP</option>
            <option value="NAILS">NAILS</option>
          </select>
        </div>
  
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">Start time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">End time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
  
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Image:</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/png, image/jpeg"
            onChange={(e) => base64Convertion(e)}
            className="form-control"
          />
        </div>
        </div>
  
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn main-btn main-element-colour secondary-colour">
            Save
          </button>
          <button
            type="button"
            className="btn main-btn accent-btn mx-2 "
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
  );
};

export default EmployeeEditForm;
