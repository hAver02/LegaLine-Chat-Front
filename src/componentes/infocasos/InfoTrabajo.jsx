
import { useState } from 'react'
import { formatDateToYYYYMMDD, isValidDateFormat } from '../../utils/formatear.Date'
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns'
export function InfoTrabajo({ infoCaso, isEditing, setInfoCaso, formErrorTrabajo, setFormErrorTrabajo, handleEditUser }) {
    // console.log(infoCaso);
    const periodoTrabajo = infoCaso.periodosTrabajados || []

    const [addWork, setAddWork] = useState(false)
    const [newWork, setNewWork] = useState({})
    const [errorNewWork, setErrorNewWork] = useState([])

    const handleInputChangeTrabajo = (e) => {
        const { name, value } = e.target
        e.preventDefault()
        const index = periodoTrabajo.findIndex(perio => perio.lugar === e.target.className)
        if(name === "hasta" || name === "desde"){
            name == 'hasta' ? periodoTrabajo[index].hasta = value : periodoTrabajo[index].desde = value
            setInfoCaso({ ...infoCaso, periodosTrabajados : periodoTrabajo});
        }else{
            // Modificamos unicamente el lugar.
            console.log('de una aca');
            periodoTrabajo[index].lugar = value
            setInfoCaso( {...infoCaso, periodosTrabajados : periodoTrabajo} )
        }
    }

    const handleAddWork = (e) => {
        e.preventDefault()
        setAddWork(!addWork)
    } 
    const changeNewWork = (e) => {
        // console.log('newWork', newWork);
        // console.log('errores', errorNewWork);
        const {value, name} = e.target

        setNewWork( { ...newWork, [name] : value } )
        if(name == 'lugar' && value == "") return
        if(name === 'desde' || name === 'hasta'){
            if(!isValidDateFormat(value) && errorNewWork.includes(name)) return
            if(!isValidDateFormat(value)){
                console.log('una sola vez');
                setErrorNewWork([...errorNewWork, name])
            }
            else{
                const ind = errorNewWork.findIndex(err => err === name)
                if(ind !== -1){
                    const errors = [...errorNewWork]
                    errors.splice(ind,1)
                    setErrorNewWork(errors)
                }
                return
            }
        }

    }
    const addWorkToCase = (e) => {
        e.preventDefault()
        if((newWork?.hasta && newWork?.desde && newWork?.lugar)){
            periodoTrabajo.push(newWork)
            setInfoCaso({...infoCaso, periodosTrabajados : periodoTrabajo})
            handleEditUser(infoCaso)
            setAddWork(false)
        }
        else{
        }
    }
    const eliminarTrabajo = (e) =>{
        e.preventDefault()
        // console.log(e);
        // console.log(e.target.className);
        const ind = periodoTrabajo.findIndex(tra => tra.lugar === e.target.className)
        if (ind == -1) return
        periodoTrabajo.splice(ind,1)
        // const copiaInfoCaso = structuredClone(infoCaso)

        setInfoCaso({...infoCaso, periodosTrabajados : periodoTrabajo})
        handleEditUser(infoCaso)


    }



    return (
        <form className='form-trabajo'>  
            {periodoTrabajo.map((periodo, i)=> (
                <div className='trabajos-info' key={i}>
                        <div className='trabajos-items'>
                        <label>Lugar: </label>
                            { isEditing 
                                ? (<input type="text" name="lugar" value={periodo.lugar} className={periodo.lugar} onChange={handleInputChangeTrabajo}/>)
                                : (<span>{periodo?.lugar}</span>)                        
                            }
                        </div>

                        <div className='trabajos-items'>
                            <label>Desde: </label>
                            { isEditing 
                                ? (<input 
                                        type="date" 
                                        name="desde"
                                        value={formatDateToYYYYMMDD(periodo.desde)} 
                                        className={periodo.lugar} 
                                        onChange={handleInputChangeTrabajo}
                                    />)
                                : (<span>{formatDateToYYYYMMDD(periodo?.desde)}</span>)                        
                            }
                        </div>

                        <div className='trabajos-items'>
                            <label>Hasta: </label>
                            { isEditing 
                                ?
                                (<input 
                                        type="date" 
                                        name="hasta" 
                                        value={formatDateToYYYYMMDD(periodo.hasta)} 
                                        className={periodo.lugar}  
                                        onChange={handleInputChangeTrabajo}
                                    />)
                                : (<span>{formatDateToYYYYMMDD(periodo?.hasta)}</span>)                        
                            }
                        </div>
                        
                        <div>
                            <p>{differenceInYears(new Date(formatDateToYYYYMMDD(periodo.hasta)), new Date(formatDateToYYYYMMDD(periodo?.desde)))} anios</p>
                            <p>{differenceInMonths(new Date(formatDateToYYYYMMDD(periodo.hasta)), new Date(formatDateToYYYYMMDD(periodo?.desde))) % 12} meses</p>
                            <p>{differenceInDays(new Date(formatDateToYYYYMMDD(periodo.hasta)), new Date(formatDateToYYYYMMDD(periodo?.desde))) % 365} dias</p>
                        </div>
                        <div className='trabajos-items'>
                            <button className={periodo.lugar} onClick={eliminarTrabajo}>
                                <i className={periodo.lugar} onClick={eliminarTrabajo}>X</i>
                            </button>
                        </div>

                </div>
                ))}         
            
            {(!addWork && !isEditing)&& <button className='button-agregar-trabajo' onClick={handleAddWork}>Agregar trabajo</button>}

            {addWork && <div className='form-agregar-trabajo'>
                {/* <h2>AGREGAR TRABAJO</h2> */}
                <div className='agregar-trabajo-items'>
                    <div className='agregar-trabajo-item'>
                        <label>Lugar: </label>
                        <input type="text" name='lugar' value={newWork.lugar} onChange={changeNewWork} />
                    </div>
                    <div className='agregar-trabajo-item'>
                        <label>Desde: </label>
                        <input type="date" name='desde' value={newWork.desde} onChange={changeNewWork} />
                    </div>
                    <div className='agregar-trabajo-item'>
                        <label>Hasta: </label>
                        <input type="date" name='hasta' value={newWork.hasta} onChange={changeNewWork} />
                    </div>  
                </div>
                <div className='agregar-trabajo-buttons'>
                        <button onClick={() => {
                            setAddWork(false)
                            setNewWork({})
                        }}>Cancelar</button>
                        <button onClick={addWorkToCase}>Agregar</button>
                </div>     
            </div>
            }

         </form>
        
    )
}