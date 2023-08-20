
import { useContext, useEffect, useState } from "react";
import { formatDateToYYYYMMDD, isValidDateFormat } from '../../utils/formatear.Date'
import { InfoPersonal } from "./InfoPersonal";
import { InfoTrabajo } from "./InfoTrabajo"
import { InfoReco } from "./infoReco";
import { InfoClaves } from "./infoClaves";
import { UserContext } from "../../context/userContext";
import { getCase, updatedCaso } from "../../api/auth";


export function InfoCaso ({caso}) {

    const [infoCaso, setInfoCaso] = useState({})
    const [isEditing, setIsEditing] = useState(false)


    // console.log(infoCaso);
    const { idUser } = useContext(UserContext)

    useEffect(() => {
      const getInfoCase = async () => {
        const rta = await getCase(caso)
        if(rta.data.ok) return setInfoCaso({...rta.data.caso, fechaNac : formatDateToYYYYMMDD(rta.data.caso.fechaNac)})
      }
      getInfoCase()
    }, [caso])

    
    const handleEditUser = async (newCaso) => {
      console.log('new Case',newCaso);
      const updated = await updatedCaso(newCaso, caso)
      console.log(updated);
      setInfoCaso(newCaso)
    };
    const handleInputChange = (e) => {
      // console.log(e);
      const { name, value } = e.target;
      if(name == 'fechaNac'){
        if(isValidDateFormat(value)){
          setFormErrorPersonal(false)
          setInfoCaso({ ...infoCaso, [name]: value });
        }
        else{
          setInfoCaso({ ...infoCaso, [name]: value });
          setFormErrorPersonal(true)
        }
      }
      else if(name == "recoAnses" || name === "recoIPS"){
        if(e.target.checked){
          setInfoCaso({...infoCaso, [name] : true})
        }else{
          setInfoCaso({...infoCaso, [name] : false})
        }
        return
      }
      else{
  
        setInfoCaso({ ...infoCaso, [name]: value });
      }
    };
    const handleEditButtonClick = (e) => {
      e.preventDefault()
      setIsEditing(true);
    };
    const handleSaveButtonClick = (e) => {
      e.preventDefault()
        setIsEditing(false);
        handleEditUser(infoCaso);
    
    };
    const addClave = () => {
      let numeroRandom = Math.floor(Math.random() * 100) + 1;
      numeroRandom = numeroRandom.toString()
      claves.push( {nombre : numeroRandom , contraseña : '' } )
      const newCaso = {... infoCaso, claves : claves}
      setInfoCaso(newCaso)
      handleEditUser(newCaso)
  }
    const claves = infoCaso?.claves || []

    return (
      <section className="main-info">
          
          <InfoPersonal infoCaso={infoCaso} handleInputChange={handleInputChange} isEditing={isEditing}/>
          
          <InfoTrabajo 
            infoCaso={infoCaso} handleInputChange={handleInputChange} 
            isEditing={isEditing} setInfoCaso={setInfoCaso}
            handleEditUser = {handleEditUser}
          />

          <InfoReco infoCaso={infoCaso} handleInputChange={handleInputChange} isEditing={isEditing} setInfoCaso={setInfoCaso}/>

          {claves.length === 0 ? 
            !isEditing && <button onClick={addClave} className="botton-agregar-clave">Agregar clave</button>
            : <InfoClaves claves={claves}  setInfoCaso={setInfoCaso} isEditing={isEditing} infoCaso={infoCaso}/>}
            
          {infoCaso.creador === idUser ?
          <div className="button-form">
              {isEditing 
                ? ( <button onClick={handleSaveButtonClick}> Guardar </button>) 
                : ( <button onClick={handleEditButtonClick}> Modificar usuario </button> )
              }
          </div> : 
          <p></p>
          }

        <div>
          {/* {saveError && <h3 className="text-error">Error al actualizar los datos</h3>} */}
        </div>
      </section>
    );
  };
