import { AddQuestion } from "./AddQuestion";
import { useState } from "react";
import { UserReplies } from "./UserReplies";

export const UserContact = () => {
    const [historyClick, setHistoryClick] = useState(false);
    function appointmentsClickFunction(){
      setHistoryClick(false);
    }
    function historyClickFunction(){
        setHistoryClick(true);
    }
    return (
        <div className="">
   
            <div className="container ">
          <div className="mt-5">
            <div className="background-container pe-3 pw-3 pt-3">
            <h4 className="display-6 text-center">Contact us!</h4>
            <h5 className="text-center">We really want to hear your opinion!</h5>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active shelf-page-controls"
                  id="nav-appointments-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-appointments"
                  type="button"
                  role="tab"
                  aria-controls="nav-appointments"
                  aria-selected="false"
                  onClick={appointmentsClickFunction}
                >
                  Add question
                </button>
    
                <button
                  className="nav-link shelf-page-controls"
                  id="nav-history-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-history"
                  type="button"
                  role="tab"
                  aria-controls="nav-history"
                  aria-selected="true"
                  onClick={historyClickFunction}
                >
                  Replies
                </button>
    
              </div>
            </nav>
            </div>
    
            <div className="tab-content"
            id='nav-tab-content'>
                <div className="tab-pane fade show active"
                id='nav-appointments'
                role="tabpanel"
                aria-labelledby="nav-appointments-tab">
  
                    <AddQuestion></AddQuestion>
                </div>
                <div className="tab-pane fade"
                id='nav-history'
                role="tabpanel"
                aria-labelledby="nav-history-tab">
                  {historyClick? <UserReplies></UserReplies> : <></>}
                   
                </div>
          
    
            </div>
          </div>
        </div>
        </div>
        
      );
}