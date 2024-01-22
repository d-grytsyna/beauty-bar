import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AppointmentService from "../../services/appointment.service";
import { useHistory } from "react-router-dom";
import TimeFormatService from "../../utils/format.functions";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export const EmployeeAppointments = () =>{
    const [appointmentTimes, setAppointmentTimes] = useState<AppointmentAdminModel[]>([]);
    const [appointmentStatusChange, setAppointmentStatusChange] = useState<UpdateAppointmentStatusModel | null>();
    const [date, setDate] = useState("");
    const [weekend, setWeekend] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (date) {
          AppointmentService.getEmployeeAppointments(date).then(
            (response) => {
              setAppointmentTimes(response.data);
            },
            (error) => {
              history.push("/error");
            }
          );
        }
      }, [appointmentStatusChange, ]);
    
    useEffect(() => {
        const date = new Date();
        const isSunday = date.getDay() === 0;
        if (isSunday) {
          setWeekend(true);
          setAppointmentTimes([]);
          return;
        }
        setWeekend(false);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
        AppointmentService.getEmployeeAppointments(formattedDate).then(
          (response) => {
            setAppointmentTimes(response.data);
          },
          (error) => {
            history.push("/error");
          }
        );
      }, []);

      function clickAppointmentStatus(id: number, status: string) {
        const statusChangeRequest = {
          id,
          status,
        };
        setAppointmentStatusChange(statusChangeRequest);
      }
    
      function handleAppointmentStatusCancel() {
        setAppointmentStatusChange(null);
      }

      const handleStatusChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const { name, value } = e.target;
        
        if (appointmentStatusChange) {
          var id = appointmentStatusChange.id;
          var status = value;
          const addModel = { id, status };
          setAppointmentStatusChange(addModel);
        }
      };


      const handleApStatusSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          if (appointmentStatusChange) {
            
            await AppointmentService.employeeStatusChange(
              appointmentStatusChange
            );
            alert("Status is : " + appointmentStatusChange.status);
            setAppointmentStatusChange(null);
          }
        } catch (error) {
          alert("Server error occured");
        }
      };
      return (
        <div className="container d-flex mt-2">
          <div className=" col-12">
            <div className="admin-calendar">
              <FullCalendar
                height={300}
                contentHeight={300}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev next",
                  center: "title",
                  right: "today",
                }}
                initialView="dayGridMonth"
                editable={true}
                dayCellContent={(arg) => {
                  const year = arg.date.getFullYear();
                  const month = String(arg.date.getMonth() + 1).padStart(2, "0");
                  const day = String(arg.date.getDate()).padStart(2, "0");
                  const formattedDate = `${year}-${month}-${day}`;
                  const isSelected = date === formattedDate;
                  const backgroundColor = isSelected ? "rgb(211, 215, 183)" : "";
    
                  return (
                    <div
                      style={{
                        background: backgroundColor,
                        fontSize: "30px",
                        borderRadius: "20%",
                      }}
                    >
                      {arg.dayNumberText}
                    </div>
                  );
                }}
                dateClick={(info) => {
                  const date = info.date;
    
                  const isSunday = date.getDay() === 0;
                  if (isSunday) {
                    setWeekend(true);
                    setAppointmentTimes([]);
                    return;
                  }
                  setWeekend(false);
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const formattedDate = `${year}-${month}-${day}`;
                  setDate(formattedDate);
                  AppointmentService.getEmployeeAppointments(formattedDate).then(
                    (response) => {
                      setAppointmentTimes(response.data);
                    },
                    (error) => {
                      history.push("/error");
                    }
                  );
                }}
              />
            </div>
            {weekend && <h2>It's day off!</h2>}
            <div className="row  g-3 p-3  mb-3">
              {appointmentTimes &&
                appointmentTimes.map((appointment) => (
                  <div
                    className="col-4 background-container rounded"
                    key={appointment.procedureName}
                  >
                    <h6 className="secondary-colour main-element-colour rounded text-center p-2">
                      {" "}
                      {appointment.procedureName}
                    </h6>
    
                    <p className="text-size-20">
                      {TimeFormatService.formatDateTime(
                        appointment.appointmentDate
                      )}{" "}
        
                    </p>
                    <p className="text-size-20">
                      {appointment.clientName} {appointment.clientSurname}{" "}
                    </p>
                    <span>Status: {appointment.appointmentStatus} </span>
                    {!appointmentStatusChange && (
                      <button
                        className="btn admin-control m-2"
                        onClick={() =>
                          clickAppointmentStatus(
                            appointment.id,
                            appointment.appointmentStatus
                          )
                        }
                      >
                        Change
                      </button>
                    )}
                    {appointmentStatusChange?.id == appointment.id && (
                      <div>
                        <select
                          value={appointmentStatusChange.status}
                          onChange={handleStatusChange}
                          className="form-select mr-2"
                        >
                          <option value="ASSIGNED">ASSIGNED</option>
                          <option value="DECLINED">DECLINED</option>
                          <option value="DONE">DONE</option>
                        </select>
                        <button
                          className=" btn main-colour secondary-element-colour"
                          onClick={(e) => handleApStatusSubmit(e)}
                        >
                          {" "}
                          Save{" "}
                        </button>
                        <button
                          className="btn btn-secondary accent-btn"
                          onClick={() => handleAppointmentStatusCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    <div>
                    </div>
                  </div>
                ))}
              {appointmentTimes.length == 0 && weekend==false && (
                <div>
                  <h4>No appointments for today</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}