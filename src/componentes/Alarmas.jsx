import { useContext, useEffect, useState,  } from "react"
import { UserContext } from "../context/userContext"
import { getNotisById } from "../api/auth"

import {isFuture, isToday, isPast} from 'date-fns'
import { formatDateToYYYYMMDD } from "../utils/formatear.Date"


export function Alarmas() {
    
    const { user, casos } = useContext(UserContext);

    const arrayCasosyAlarmas = casos.map(caso => ( {idAlarma : caso.alarmas, caso : caso.apellido} ) || [])
    const arrayCasos = arrayCasosyAlarmas.map(casoyAlarma => ( casoyAlarma.idAlarma))
    const idsCasos = [...arrayCasos.flat()]


    const [alarmas, setAlarmas] = useState([])
    // console.log(alarmas);

    function getApellidoCaso(id){
        const index = arrayCasosyAlarmas.findIndex(con => con.idAlarma.includes(id))
        // console.log(arrayCasosyAlarmas);
        return arrayCasosyAlarmas[index]?.caso
    }

    useEffect(() => {
        async function getNotis (){
            if(casos.length == 0 || idsCasos.length == 0) return
            try {
                    const rta = await getNotisById(idsCasos)
                    setAlarmas(rta.data.notificaciones)        
            } catch (error) {
                
            }
        }
        getNotis()
    }, [casos])

    const alarmasProximas = alarmas.filter(alarm => !isPast(new Date(alarm.vencimiento)))
    return(
        <section className="main-alarmas">
            <div className="alarmas-header">
                <h1>Legal-Line Chat</h1>
                <p>Esta aplicacion te permite centralizar casos legales, chats y calculos.</p>
                <p>Te simplifica la colaboracion entre abogacion y optimiza tu práctica legal.</p>
            </div>
            <div className="body-alarmas">
                <h2>Alarmas proximas a vencer</h2>
                <div className="container-alarmas">
                    {alarmasProximas.map(alarm => (
                        <div key={alarm._id} className="alarmas">
                            <div className="alarma-item alarmas-titulo">
                                <label>Titulo: </label>
                                <p>{alarm.mensaje}</p>
                            </div>
                            <div className="alarma-item alarmas-caso"> 
                                <label>Pertene al caso: </label>
                                <p>{getApellidoCaso(alarm._id)}</p>
                            </div>
                            <div className="alarma-item alarmas-vencimiento">
                                <label>Vencimiento</label>
                                <p>{formatDateToYYYYMMDD(alarm.vencimiento)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}