import ProcedureModel from "../../../models/procedure/ProcedureModel";
import { useState, ChangeEvent, FormEvent } from "react";
import ProcedureService from "../../../services/procedure.service";
import { useHistory } from 'react-router-dom';
interface ProcedureEditFormProps {
    procedure: ProcedureModel;
    onCancel: () => void;
  }
const ProcedureEditForm: React.FC<ProcedureEditFormProps> = ({ procedure, onCancel }) => {
  const history = useHistory();
  const [formData, setFormData] = useState<ProcedureModel>({
    id: procedure.id,
    type: procedure.type,
    name: procedure.name,
    description: procedure.description,
    price: procedure.price,
    discount: procedure.discount,
    time: procedure.time,
    img: procedure.img
  });


  const [error, setError] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateForm(name, value);
    
         setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
}

const validateForm = (name: string, value: any): boolean => {
  
  if(name==='id') return true;
  if (value === '' || value == null) {
      setError('All fields must be filled out.');
      return false;
    }

    switch (name) {
      case 'name':
        if (value.trim().length <= 2 || value.trim().length > 50 || !/^[a-zA-Z\s]+$/.test(value.trim())) {
          setError('Name must be more than 2 characters, up to 50 and contain only letters.');
          return false;
        }else setError('')
        break;
        
      case 'description':
        if (value.trim().length <= 10 || value.trim().length >300) {
          setError('Description must be more than 10 characters and up to 300');
          return false;
        }else setError('')
        break;
      case 'price':
          const priceValue = parseFloat(value);
          if (isNaN(priceValue) || priceValue < 10 || priceValue >= 1000 || !/^\d+$/.test(value)) {
            setError('Price must be a valid number, more than 10 and less than 1000.');
            return false;
          } else {
            setError('');
          }
          break;
        case 'time':
            if (value < '00:15' || value > '06:00') { 
              setError('Procedure duration must be between 15 minutes and 6 hours.');
              return false;
            } else {
              setError('');
            }
            break;
        case 'discount':
              const discountValue = parseFloat(value);
              if (isNaN(discountValue) || discountValue < 0 || discountValue > 80 || !/^\d+$/.test(value)) {
                setError('Discount must be a valid number between 0 and 80.');
                return false;
              } else {
                setError('');
              }
              break;
              default: break;
       } 
       setError('');
       return true;
       
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
    if (formData && procedure.id) await ProcedureService.editProcedure(procedure.id, formData);
    alert("Procedure succesfully edited!")
    onCancel();
  } catch (apiError: any) {
    if (apiError?.response?.status) {
      const statusCode = apiError.response.status;

      switch (statusCode) {
        case 400:
          alert("Invalid data is being added.");
          break;
        case 404:
          alert("Procedure with " + formData.id + "not found");
          break;
        case 401:
          alert("Authorization token ended please sign in");
          history.push('/login'); // Adjust the path to your sign-in page
            break;
        default:
          alert("An error occurred while editing the procedure.");
      }
    } else {
      alert("An error occurred while editing the procedure.");

    }
  }}
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
    setFormData((prev) => ({
      ...prev,
      img: reader.result?.toString().split(",")[1],
    }));
  };
  reader.onerror = function (error) {
    console.log("Error", error);
  };
}
  return(
 
      <form
      onSubmit={handleSubmit}
      className="container my-4 d-flex justify-content-center flex-column align-items-center"
    >
        <h1>Edit procedure </h1>
        <p>{error}</p>
      <div className="row col-6">

        <div className="mb-3 col-6">
          <label htmlFor="workType" className="form-label">Procedure type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="HAIR">HAIR</option>
            <option value="MAKEUP">MAKE-UP</option>
            <option value="NAILS">NAILS</option>
          </select>
        </div>

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

        <div className="mb-3 col-12">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            style={{ width: '600px', height: '100px' }}
          />
        </div>

        <div className="mb-3 col-6">
          <label htmlFor="description" className="form-label">Price $:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 col-6">
          <label htmlFor="discount" className="form-label">Discount %:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="mb-3 col-6">
          <label htmlFor="time" className="form-label">Estimated time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
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
          <button type="submit" className="btn main-btn accent-btn">
            Save
          </button>
          <button
            type="button"
            className="btn main-btn main-colour-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
    </form>
  )
}
export default ProcedureEditForm;