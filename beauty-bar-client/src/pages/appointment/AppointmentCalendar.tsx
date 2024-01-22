import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ProcedureService from "../../services/procedure.service";
import ProcedureAppointmentModel from "../../models/appointment/ProcedureAppointmentModel";
import TimeFormatService from "../../utils/format.functions";
import { useHistory } from "react-router-dom";
import { AppointmentConfirmation } from "./components/AppointmentConfirmation";
export const AppointmentCalendar = () => {
  const categoryName = window.location.pathname.split("/")[2];
  const procedureId = parseInt(window.location.pathname.split("/")[3]);
  const [date, setDate] = useState("");
  const [appointmentTimes, setAppointmentTimes] =
    useState<ProcedureAppointmentModel>();
  const [weekend, setWeekend] = useState(false);
  const [chosenTime, setChosenTime] =
    useState<AppointmentConfirmModel | null>();
  const history = useHistory();

  function formatEstimatedTime(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":");

    if (minutes !== "00" && hours !== "00") {
      return `${hours} hours ${minutes} minutes`;
    }
    if (hours !== "00") {
      return `${hours} h`;
    } else {
      return `${minutes} minutes`;
    }
  }
  const today = new Date().toISOString().split("T")[0];
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  const endDay = endDate.toISOString().split("T")[0];
  const addAppointmentModel = (
    procedureId: number,
    date: string,
    employeeName: string,
    employeeId: number,
    employeeSurname: string,
    startTime: string
  ) => {
    const appointmentConfirmModel = {
      procedureId,
      date,
      employeeName,
      employeeId,
      employeeSurname,
      startTime,
    };
    setChosenTime(appointmentConfirmModel);
  };
  const handleCancel = () => {
    setChosenTime(null);
  };
  return (
    <div className="container p-5">
      <h1>CHOOSE THE DATE</h1>
      <div className="row">
        <div className="col-5">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev next",
              center: "title",
              right: "today",
            }}
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
            initialView="dayGridMonth"
            editable={true}
            dateClick={(info) => {
              const date = info.date;
              const isSunday = date.getDay() === 0;
              if (isSunday) {
                setWeekend(true);
                setAppointmentTimes(undefined);
                return;
              }
              setWeekend(false);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const formattedDate = `${year}-${month}-${day}`;
              setDate(formattedDate);
              ProcedureService.getAvailableAppointments(
                categoryName,
                procedureId,
                formattedDate
              ).then(
                (response) => {
                  setAppointmentTimes(response.data);
                },
                (error) => {
                  history.push("/error");
                }
              );
            }}
            validRange={{ start: today, end: endDate }}
          />
        </div>

        <div className="col-7">
          <div>
            <div>
              {chosenTime && (
                <AppointmentConfirmation
                  appointment={chosenTime}
                  onCancel={handleCancel}
                ></AppointmentConfirmation>
              )}
              {weekend && <h2>It's day off!</h2>}
              {appointmentTimes && (
                <div className="">
                  <h1>{appointmentTimes.procedureName}</h1>
                  <h2 className="accent-element-colour">
                    {TimeFormatService.formatDate(appointmentTimes.date)}
                  </h2>
                  <h4>Price: {appointmentTimes.price}$</h4>
                  {appointmentTimes.discount !== 0 && (
                    <h4>Discount: {appointmentTimes.discount} %</h4>
                  )}
                  <h4>
                    Estimated time:{" "}
                    {formatEstimatedTime(appointmentTimes.estimatedTime)}
                  </h4>
                </div>
              )}
              {appointmentTimes?.employeeAppointment.map(
                (employeeAppointmentInfo, index) => (
                  <div className="p-3" key={index}>
                    <div className="d-flex align-items-center">
                      <img
                        src={`data:image/jpeg;base64,${employeeAppointmentInfo.image}`}
                        width="100"
                        height="100"
                        className="rounded-circle"
                        alt="employee"
                      />
                      <p className="p-3 appointment-employee-name">
                        {" "}
                        Beauty master: {
                          employeeAppointmentInfo.employeeName
                        }{" "}
                        {employeeAppointmentInfo.employeeSurname}
                      </p>
                    </div>

                    {employeeAppointmentInfo.appointmentTime.map(
                      (time, timeIndex) => (
                        <button
                          className="btn-appointment-time"
                          key={timeIndex}
                          onClick={() =>
                            addAppointmentModel(
                              appointmentTimes.procedureId,
                              TimeFormatService.formatDate(
                                appointmentTimes.date
                              ),
                              employeeAppointmentInfo.employeeName,
                              employeeAppointmentInfo.employeeId,
                              employeeAppointmentInfo.employeeSurname,

                              TimeFormatService.formatTime(time)
                            )
                          }
                        >
                          {TimeFormatService.formatTime(time)}
                        </button>
                      )
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
