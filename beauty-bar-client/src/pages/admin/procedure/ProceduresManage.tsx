import ProcedureModel from "../../../models/procedure/ProcedureModel";
import { useState, useEffect } from "react";
import ProcedureService from "../../../services/procedure.service";
import { useHistory } from "react-router-dom";
import ProcedureEditForm from "./ProcedureEditForm";
import ProcedureAddForm from "./ProcedureAddForm";
import { Loading } from "../../../utils/Loading";
export const ProceduresManage = () => {
    const [procedures, setProcedures] = useState<ProcedureModel[]>([]);
    const [editProcedure, setEditProcedure] = useState<ProcedureModel | null>();
    const [addProcedure, setAddProcedure] = useState(false);
    const [deleteProc, setDeleteProc] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const filteredProcedures = procedures.filter((procedure) =>
    procedure?.name?.toLowerCase().includes(searchTerm.toLowerCase())||
    procedure?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
        ProcedureService.getAllProcedures().then(
          (response) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setProcedures(response.data);
            setDeleteProc(false);
            setIsLoading(false);
          },
          (error) => {
            history.push("/error");
          }
        );
      }, [editProcedure, addProcedure, deleteProc]);
      const handleCancelEdit = () => {
        setEditProcedure(null);
        
      };
      const handleCancelAdd = () =>{
        setAddProcedure(false);
      }

      const deleteProcedure =  async (id: any, name: any) =>{
        const shouldDelete = window.confirm("Are you sure you want to delete this procedure: " + name +  "?");
    
        if (shouldDelete) {
          try {
            await ProcedureService.deleteProcedure(id);
            setDeleteProc(true);
            alert("Procedure deleted");
          } catch (apiError) {
            alert('An error occured during deleting');
          }
        }
      }
      if(isLoading){
        return <Loading></Loading>
      }
    return (
        <div className="container mt-4 ">
          { (editProcedure && !addProcedure) &&
        <ProcedureEditForm procedure={editProcedure} onCancel={handleCancelEdit} />}
        {addProcedure  &&
        <ProcedureAddForm onCancel={handleCancelAdd} ></ProcedureAddForm>
        }
        { (!addProcedure && !editProcedure) &&
        <button className="btn accent-btn m-3"
        onClick={() => setAddProcedure(true)}

        >Add procedure</button>}
        
  
          <div className="row">
            <div className="col-6 m-3">
            <input
            type="text"
            className="form-control"
            placeholder="Search procedures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            </div>
         
          </div>
         
         <div className="scrollable-container m-3 mb-5">

         {searchTerm==='' ? (
             procedures.length > 0 ? (
              
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Picture</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Time</th>
                    <th>Discount</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {procedures.map((procedure) => (
                    <tr key={procedure.id}>
                      <td>{procedure.id}</td>
                      <td>
                        <img
                          src={`data:image/jpeg;base64,${procedure.img}`}
                          width="100"
                          height="100"
                          alt="hair"
                        />
                      </td>
                      <td>{procedure.type}</td>
                      <td>{procedure.name}</td>
                      <td>{procedure.description}</td>
                      <td>{procedure.price}</td>
                      <td>{procedure.time}</td>
                      <td> {procedure.discount}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-pencil m-3"
                          viewBox="0 0 16 16"
                          onClick={() => setEditProcedure(procedure)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
      
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-trash3 m-3"
                          viewBox="0 0 16 16"
                          onClick={() => deleteProcedure(procedure?.id, procedure?.name)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No procedures found</p>
            )
           ): (
            filteredProcedures.length > 0 ? (
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Picture</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Time</th>
                    <th>Discount</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProcedures.map((procedure) => (
                    <tr key={procedure.id}>
                      <td>{procedure.id}</td>
                      <td>
                        <img
                          src={`data:image/jpeg;base64,${procedure.img}`}
                          width="100"
                          height="100"
                          alt="hair"
                        />
                      </td>
                      <td>{procedure.type}</td>
                      <td>{procedure.name}</td>
                      <td>{procedure.description}</td>
                      <td>{procedure.price}</td>
                      <td>{procedure.time}</td>
                      <td> {procedure.discount}</td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-pencil m-3"
                          viewBox="0 0 16 16"
                          onClick={() => setEditProcedure(procedure)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
      
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-trash3 m-3"
                          viewBox="0 0 16 16"
                          onClick={() => deleteProcedure(procedure?.id, procedure?.name)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No procedures found</p>
            )

           )}
         </div>
           
          
        </div>
      );
}