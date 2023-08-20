import { formatDateToYYYYMMDD } from "../utils/formatear.Date"
import { getHours, getMinutes } from 'date-fns'
export function Message ({ mess, whoSent }) {
    
    function getHora(fecha) {
        const hora = getHours(new Date(fecha))
        const minutos = getMinutes(new Date(fecha))
        return `${hora}:${minutos}`
    }

    // console.log(mess);
    return ( 
            <div className="container-message">
                <div>
                    {!whoSent(mess?.user?.email) && <h5>{mess?.user?.nombre}</h5> }
                    {/* <h6>{formatDateToYYYYMMDD(mess?.date)}</h6> */}
                </div>
                <p>{mess.message}</p>
                <small>{getHora(mess?.date)}</small>
            </div>

)}