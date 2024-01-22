import "./App.css";
import { Navbar } from './layout/Navbar';
import { Footer } from "./layout/Footer";
import { HomePage } from "./pages/home/HomePage";
import {CategoryProcedure} from "./pages/procedure/CategoryProcedure"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from "react";
import AccountModel from "./models/account/AccountModel";
import authService from "./services/auth.service";
import Profile from "./pages/profile/Profile";
import Login from "./auth/Login";
import eventBus from "./common/EventBus";
import Register from "./auth/Register";

import { Procedures } from "./pages/procedure/Procedures";
import { AppointmentCalendar } from "./pages/appointment/AppointmentCalendar";
import PrivateRoute from "./auth/PrivateRoute";
import { ErrorPage } from "./error/ErrorPage";
import { ProceduresManage } from "./pages/admin/procedure/ProceduresManage";
import { AppointmentSuccess } from "./pages/appointment/success/AppointmentSuccess";
import { UserAppointments } from "./pages/user/appointments/UserAppointments";
import { UserPaymentManage } from "./pages/user/payment/UserPaymentManage";
import { AdminAppointments } from "./pages/admin/appointment/AdminAppointments";
import { UserContact } from "./pages/user/contact/UserContact";
import { AdminMessages } from "./pages/admin/messages/AdminMessages";
import { ManageAccounts } from "./pages/admin/account/ManageAccounts";
import { EmployeeAppointments } from "./pages/employee/EmployeeAppointments";
import { Employees } from "./pages/admin/employee/Employees";


export const App = () => {
  const [currentUser, setCurrentUser] = useState<AccountModel | undefined>(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    eventBus.on("logout", logOut);

    return () => {
      eventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    authService.logout();
    setCurrentUser(undefined);
  };
  return (
    <div className="d-flex flex-column min-vh-100">
     <Navbar  currentUser={currentUser} logOut={logOut}></Navbar>
     <div className="flex-grow-1 d-flex flex-column">
     <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>

        <Route path="/home">
          <HomePage />
        </Route>

        <Route path="/procedure" exact>
          <CategoryProcedure/>
        </Route>

        <Route path="/procedure/:categoryName" exact>
          <Procedures/>
        </Route>

        <PrivateRoute path="/procedure/:categoryName/:id" role="[ROLE_USER]" exact component={ AppointmentCalendar}></PrivateRoute>

        <PrivateRoute path="/profile" component={Profile} />

        <PrivateRoute path="/admin/employee" role="[ROLE_ADMIN]" component={Employees} />

        <PrivateRoute path="/admin/procedure" role="[ROLE_ADMIN]" component={ProceduresManage} />
        <PrivateRoute path="/admin/appointment" role="[ROLE_ADMIN]" component={AdminAppointments} />

        <PrivateRoute path="/admin/messages" role="[ROLE_ADMIN]" component={AdminMessages} />
        <PrivateRoute path="/admin/accounts" role="[ROLE_ADMIN]" component={ManageAccounts} />
        <PrivateRoute path="/appointment/assigned" role="[ROLE_USER]" exact component={AppointmentSuccess}></PrivateRoute>

        <PrivateRoute path="/appointments" role="[ROLE_USER]" exact component={UserAppointments}></PrivateRoute>
        
        <PrivateRoute path="/receipt" role="[ROLE_USER]" exact component={UserPaymentManage}></PrivateRoute>
        <PrivateRoute path="/contact" role="[ROLE_USER]" exact component={UserContact}></PrivateRoute>

        <PrivateRoute path="/employee/appointments" role="[ROLE_EMPLOYEE]" exact component={EmployeeAppointments}></PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>

        <Route path="/register">
          <Register></Register>
        </Route>

        <Route path="/error" component={ErrorPage}></Route>

        
      </Switch>
    </Router>

      
       
     </div>
     <Footer></Footer>
    </div>
  );
}


