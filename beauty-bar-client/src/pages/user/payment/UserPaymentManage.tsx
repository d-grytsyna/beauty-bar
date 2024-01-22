import { useState } from "react";
import { UserReceipts } from "./UserReceipts";
import { UserPaymentHistory } from "./UserPaymentHistory";
export const UserPaymentManage = () => {
  
    const [historyClick, setHistoryClick] = useState(false);
    function paymentsClickFunction(){
      setHistoryClick(false);
    }
    function historyClickFunction(){
        setHistoryClick(true);
      }
     return (
        <div>
            <div className="container">
            <div className="mt-5">
              <h4 className="display-6 text-center">My payments</h4>
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                      onClick={paymentsClickFunction}
                    className="nav-link active shelf-page-controls"
                    id="nav-appointments-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-appointments"
                    type="button"
                    role="tab"
                    aria-controls="nav-appointments"
                    aria-selected="false"
                  >
                    Current
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
    
                        <UserReceipts/>
                  </div>
                  <div className="tab-pane fade"
                  id='nav-history'
                  role="tabpanel"
                  aria-labelledby="nav-history-tab">
                      {historyClick? <UserPaymentHistory></UserPaymentHistory> : <></>}
                  </div>
            
      
              </div>
            </div>
          </div>
        </div>
    );
  };