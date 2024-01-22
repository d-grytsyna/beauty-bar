import { useEffect, useState } from "react";
import AppointmentService from "../../../services/appointment.service";
import UserAppointmentModel from "../../../models/appointment/UserAppointmentModel";
import { useHistory } from "react-router-dom";
import TimeFormatService from "../../../utils/format.functions";
export const AppointmentsHistory = () =>{

    const [appointments, setAppointments] = useState<UserAppointmentModel[]>([]);
    const history = useHistory();
    useEffect(() => {
        AppointmentService.getAppointmentHistory().then(
          (response) => {
            setAppointments(response.data);
          },
          (error) => {
            const _content =
            history.push("/error");
          }
        );
      }, []);
    return(
        <div className="container mt-5 mb-5">
            <div className="row g-5 p-3 ">
            {appointments && appointments.map((appointment) => 
            
                <div className="col-6" key={appointment.procedureName}>
                    <div className="main-colour rounded p-3">
                    <h5 className="secondary-colour main-element-colour rounded text-center p-2"> {appointment.procedureName}</h5>
                   <div className="pe-3">
                   <h4>{TimeFormatService.formatDateTime(appointment.appointmentDate)} : {appointment.employeeName} {appointment.employeeSurname}</h4>
                    <h4>Price: {appointment.price}$</h4>
                   </div>
                    </div>
                    
                </div>
           
            
            )}
        </div>
            
        </div>
    )
}