import api from "./api";


const addAppointment = (data: AppointmentConfirmModel) =>{
    return api.post("/appointment", data);
  }

  const getAppointments = () =>{
    return api.get("/appointment");
  }

  const getAppointmentHistory = () =>{
    return api.get("/appointment/history");
  }

  const getAdminAppointmens = (date: string) =>{
    const url = `/admin/appointment?date=${date}`;
    return api.get(url);
  }
  const changeAppointmentStatus = (data: UpdateAppointmentStatusModel) =>{
    return api.put("/admin/appointment/status-update", data);
  }

  const employeeStatusChange = (data: UpdateAppointmentStatusModel) =>{
    return api.put("/employee/appointment/status-update", data);
  }
  const changePaymentStatus = (data: UpdateAppointmentStatusModel) =>{
    return api.put("/admin/appointment/payment-update", data);
  }


  const getEmployeeAppointments = (date: string) =>{
    const url = `/employee/appointment?date=${date}`;
    return api.get(url);
  }

  const reminderSend = (message: EmailMessage) =>{
    return api.post("/admin/appointment/reminder", message);
  }
  const AppointmentService = {
    addAppointment,
    getAppointments,
    getAppointmentHistory,
    getAdminAppointmens,
    changeAppointmentStatus,
    changePaymentStatus,
    reminderSend,
    getEmployeeAppointments,
    employeeStatusChange
  };
  export default AppointmentService;