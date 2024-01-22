import { useState, useEffect } from "react";
import ProcedureModel from "../../models/procedure/ProcedureModel";
import ProcedureService from "../../services/procedure.service";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Loading } from "../../utils/Loading";
export const Procedures = () =>{
    const categoryId = (window.location.pathname).split('/')[2];
    const [procedures, setProcedures] = useState<ProcedureModel[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoadingProcedures, setIsLoadingProcedures] = useState(true);
    const history = useHistory();
    function setHeader(){
        if(categoryId==="hair"){
            setCategoryName("HAIR")
        }else if (categoryId==="makeup"){
            setCategoryName("MAKE-UP")
        }else if(categoryId==="nails"){
            setCategoryName("NAILS")
        }
    }
    
  useEffect(() => {
    ProcedureService.getCategoryProcedures(categoryId).then(
      (response) => {
        setProcedures(response.data);
        setHeader();
        setIsLoadingProcedures(false);
      },
      (error) => {
        setIsLoadingProcedures(false);
        const _content =
        history.push("/error");
      }
    );
  }, []);
  if (isLoadingProcedures) {
    return <Loading></Loading>;
  }
  
    return(
        <div className="container mt-5">
            <h1 className="w-100 text-center display-3">{categoryName}</h1>
            {procedures && procedures.map((procedure) => 
            <div className="row background-container g-0 procedure-info-row" key={procedure.id}>
                <div className="col-5">
                <img
              src={`data:image/jpeg;base64,${procedure?.img}`}
              width="400"
              height="400"
              alt="hair"
            />
                </div>
                <div className="col-7">
                    <h2 className="secondary-colour main-element-colour procedure-title"> {procedure.name}</h2>
                   <div className="pe-3">
                   <p className="procedure-description mt-4"> {procedure.description}</p>
                    <h4>Price: {procedure.price}$</h4>
                    {procedure.discount!==0 &&
                    <h5>Discount: {procedure.discount}%</h5>
                    }
                    <Link to ={`/procedure/${categoryId}/${procedure.id}`}> <button className="btn accent-btn mt-4">Make an Appointment</button></Link>
                   </div>
                    
                </div>
            
            
            </div>
            
            )}
     
            
        </div>
    )
}