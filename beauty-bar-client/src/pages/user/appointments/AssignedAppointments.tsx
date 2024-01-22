import { useEffect, useState } from "react";
import AppointmentService from "../../../services/appointment.service";
import UserAppointmentModel from "../../../models/appointment/UserAppointmentModel";
import { useHistory } from "react-router-dom";
import TimeFormatService from "../../../utils/format.functions";
export const AssignedAppointments = () =>{

    const [appointments, setAppointments] = useState<UserAppointmentModel[]>([]);
    const history = useHistory();
    useEffect(() => {
        AppointmentService.getAppointments().then(
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
            {appointments && appointments.map((appointment) => 
            <div className="row background-container g-0 p-3 procedure-info-row rounded" key={appointment.procedureName}>
    
                <div className="col-12">
                    <h2 className="secondary-colour main-element-colour rounded text-center p-2"> {appointment.procedureName}</h2>
                   <div className="pe-3">
                   <p className="procedure-description mt-4"> {appointment.procedureDescription}</p>
                   <h4>{TimeFormatService.formatDateTime(appointment.appointmentDate)} : {appointment.employeeName} {appointment.employeeSurname}</h4>
                   <p></p>
                    <h4>Price: {appointment.price}$</h4>
                   </div>
                </div>
            </div>
            
            )}
     
            
        </div>
    )
}