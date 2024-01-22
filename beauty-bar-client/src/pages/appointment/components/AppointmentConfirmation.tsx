import React, { useState, ChangeEvent, FormEvent } from "react";
import AppointmentService from "../../../services/appointment.service";
import { useHistory } from "react-router-dom";
interface AppointmentConfirmationProps {
  appointment: AppointmentConfirmModel;
  onCancel: () => void;
}

export const AppointmentConfirmation: React.FC<
  AppointmentConfirmationProps
> = ({ appointment, onCancel }) => {
  const [formData, setFormData] = useState<AppointmentConfirmModel>({
    procedureId: appointment.procedureId,
    employeeName: appointment.employeeName,
    employeeSurname: appointment.employeeSurname,
    employeeId: appointment.employeeId,
    date: appointment.date,
    startTime: appointment.startTime,
    payment: "CASH",
  });
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPaymentMethod(e.target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (formData) {
        const response = await AppointmentService.addAppointment(formData);
        if (response.status === 200) {
          history.push("/appointment/assigned");
        }
      }
    } catch (apiError: any) {
      const statusCode = apiError.response.status;

      switch (statusCode) {
        case 400:
          alert("Invalid data is being added.");
          break;
        case 401:
          alert("Authorization token ended please sign in");
          break;

        case 409:
          alert("Time was taken, please reload the page to see available times");
          break;
        default:
          alert("An error occurred while adding the procedure.");
      }
    }
  };
  return (
    <div className="main-color">
      <form onSubmit={handleSubmit}>
        <h4>Appointment info:</h4>
        <p>
          {formData.employeeName} {formData.employeeSurname} : {formData.date}{" "}
          {formData.startTime}
        </p>
        <div className="mb-3">
          <label htmlFor="workType" className="form-label">
            Choose payment type:
          </label>
          <select
            id="payment"
            name="payment"
            value={paymentMethod}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
          </select>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn main-colour-btn">
            Confirm
          </button>
          <button
            type="button"
            className="btn accent-btn mx-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
