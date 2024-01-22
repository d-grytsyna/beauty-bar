import { Link } from "react-router-dom";
export const AppointmentSuccess = () => {
  return (
    <div className="background-container flex-grow-1">
      <div className="container d-flex align-items-center flex-column mt-5">
        <h1>Thanks for creating appointment!</h1>
        <h4>We are waiting for your visit!</h4>
        <Link to="/appointments">
          <button className=" btn accent-btn">Check your appointments</button>
        </Link>
      </div>
    </div>
  );
};
