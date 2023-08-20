import { useState } from "react"
// import { loginReques } from "../../api/auth"

export function InfoReco ({infoCaso, handleInputChange, isEditing, setInfoCaso}) {
    // console.log(infoCaso);
    // const [casoJubilacion, setCasoJubilacion ] = useState(infoCaso.tipoJubilacion)
    const changeJubilacion = (e) => {
        setInfoCaso({...infoCaso, tipoJubilacion : e.target.value})
    }
    // console.log(infoCaso);
    return (
        <div className="info-reco">
                <div className="reco-item">
                    <label>RECONOCIMIENTO ANSES: </label>
                    {isEditing ? 
                    <input type="checkbox" name="recoAnses" checked={infoCaso.recoAnses} onChange={handleInputChange} />
                    : <span>{infoCaso.recoAnses ? "SI" : "NO"}</span>
                    }
                </div>
                <div className="reco-item">
                    <label>RECONOCIMIENTO IPS: </label>
                    {isEditing ? 
                    <input type="checkbox" name="recoIPS" checked={infoCaso.recoIPS} onChange={handleInputChange} />
                    : <span>{infoCaso.recoIPS ? 'SI' : "NO"}</span>
                    }
                </div>
                <div className="reco-item">
                    <label>Jubilacion:</label>
                    {isEditing ? 
                    <select name="tipoJubilacion" value={infoCaso.tipoJubilacion} onChange={changeJubilacion}>
                        <option value="DOCENTE IPS">DOCENTE IPS</option>
                        <option value="OTRA">OTRA</option>
                        <option value="IPS">IPS</option>
                        <option value="ANSES">ANSES</option>
                        <option value="MIXTA IPS-ANSES">MIXTA IPS-ANSES</option>
                        <option value="MIXTA ANSES-IPS">MIXTA ANSES-IPS</option>
                    </select> 
                    :
                    <span>{infoCaso.tipoJubilacion}</span>
                    }
                </div>
       </div>
    )
}