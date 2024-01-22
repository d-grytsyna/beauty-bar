import ProcedureModel from "../models/procedure/ProcedureModel";
import api from "./api";

const getCategoryProcedures= (data: string) => {
    return api.get("/procedure/" + data);
    
  };
  const getAllProcedures = () =>{
     return api.get("/admin/procedure");
  }

  const editProcedure = (procedureId: number, data: ProcedureModel) =>{
    return api.put("/admin/procedure/" + procedureId, data);
 }

 const addProcedure = (data: ProcedureModel) =>{
  return api.post("/admin/procedure", data);
}
  const getAvailableAppointments = (category: string, procedureId: number, date: string) => {
    const url = `/procedure/${category}/${procedureId}?date=${date}`;
    return api.get(url);
  };

  const deleteProcedure = (id: any) =>{
    return api.delete("/admin/procedure/" + id);
  }
  


  const ProcedureService = {
    getCategoryProcedures,
    getAvailableAppointments,
    getAllProcedures,
    editProcedure,
    addProcedure,
    deleteProcedure
  };
  export default ProcedureService;