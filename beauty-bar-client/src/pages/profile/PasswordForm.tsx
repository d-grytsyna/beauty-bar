import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import ProfileService from "../../services/profile.service";

export const PasswordForm = () => {
  const [formData, setFormData] = useState<PasswordChangeModel>({
    oldPassword:'',
    newPassword: ''
  });
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if(formData.newPassword!='') validateForm('newPassword', formData.newPassword);
  }, [formData.newPassword, confirmPassword]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateForm(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (name: string, value: any): boolean => {

    if (value === '' || value == null) {
      setError("All fields must be filled out.");
      return false;
    }
  
      switch (name) {
        case 'oldPassword':
            if (value.length < 10 || value.length >64) {
              setError('Old password must be between 10 and 64 symbols');
              return false;
            }else setError('')
            break;
        case 'newPassword':
          
          if (value.length < 10 || value.length >64 || !/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/[A-Z]/.test(value)) {
            setError('Password must be at least 10 characters and contain letters, uppercase, and numbers.');
            return false;
          }else if(confirmPassword!=value){
            setError('New password and confirm new password should match');
            return false;
          } setError('')
          break;
        };
          setError('');
         return true;
         
 }

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  let isValid = true;
  if (!formData) {
      return false;
    }
  
    for (const [name, value] of Object.entries(formData)) {
      let isFieldValid = validateForm(name, value);
      if(formData.newPassword===formData.oldPassword && (formData.newPassword!=='') &&
      (formData.oldPassword!=='')){
        setError("New password should differ from old");
        isFieldValid = false;
      }
      if (!isFieldValid) {
        isValid = false;
        break;
      }
    }
  if(isValid){
  try {
    if (formData) await ProfileService.changePassword(formData);
    alert("Password successfully changed!");
    setFormData({
      oldPassword: '',
      newPassword: '',
    });
    setConfirmPassword('');
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
        case 409:
          alert("Old password does not match");
            break;
        default:
          alert("An error occurred while adding the passwords.");
      }
    } else {
      alert("An error occurred while adding the passwords.");

    }
  }}
};
  return (
      <div className="col-6">
        <form 
      onSubmit={handleSubmit}
        className=" d-flex justify-content-center flex-column align-items-center">
          <h4>Reset password </h4>

          <p>{error}</p>
          <div className="mb-3 col-6">
            <label htmlFor="oldPassword" className="form-label">
              Current Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              className="form-control"
              value={formData.oldPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 col-6">
            <label htmlFor="newPassword" className="form-label">
              New password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-control"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 col-6">
            <label htmlFor="description" className="form-label">
              Confirm new password:
            </label>
            <input
              type="password"
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn accent-btn mt-4">
            Save
          </button>
        </form>
      </div>
  );
};
