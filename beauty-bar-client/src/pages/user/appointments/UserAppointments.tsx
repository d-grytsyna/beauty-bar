import { useState } from "react";
import { AssignedAppointments } from "./AssignedAppointments";
import { AppointmentsHistory } from "./AppointmentsHistory";
export const UserAppointments = () => {
  
    const [historyClick, setHistoryClick] = useState(false);
    function appointmentsClickFunction(){
      setHistoryClick(false);
    }
    function historyClickFunction(){
        setHistoryClick(true);
      }
      
     return (
      <div className="container">
        <div className="mt-5">
          <h4 className="display-6 text-center">My appointments</h4>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                  onClick={appointmentsClickFunction}
                className="nav-link active shelf-page-controls"
                id="nav-appointments-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-appointments"
                type="button"
                role="tab"
                aria-controls="nav-appointments"
                aria-selected="false"
              >
                Appointments
              </button>
  
              <button
              onClick={historyClickFunction}
                className="nav-link shelf-page-controls"
                id="nav-history-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-history"
                type="button"
                role="tab"
                aria-controls="nav-history"
                aria-selected="true"
              >
                History
              </button>
  
            </div>
          </nav>
  
          <div className="tab-content"
          id='nav-tab-content'>
              <div className="tab-pane fade show active"
              id='nav-appointments'
              role="tabpanel"
              aria-labelledby="nav-appointments-tab">

                    <AssignedAppointments/>
              </div>
              <div className="tab-pane fade"
              id='nav-history'
              role="tabpanel"
              aria-labelledby="nav-history-tab">
                  {historyClick? <AppointmentsHistory></AppointmentsHistory> : <></>}
              </div>
        
  
          </div>
        </div>
      </div>
    );
  };