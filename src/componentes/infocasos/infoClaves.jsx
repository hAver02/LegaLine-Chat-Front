

export function InfoClaves({ claves, isEditing, infoCaso, setInfoCaso }){

    const changeClaves = (e) => {
        e.preventDefault()
        const { value, name } = e.target
        const ind = claves.findIndex(cla => cla.nombre == e.target.className)
        // console.log(ind);
        if(ind != -1) { 
            name == "nombre" ? claves[ind].nombre = value : claves[ind].contraseña = value
            setInfoCaso({...infoCaso, claves : claves})
        }
    }

    const addClave = () => {
        let numeroRandom = Math.floor(Math.random() * 100) + 1;
        numeroRandom = numeroRandom.toString()
        claves.push( {nombre : numeroRandom , contraseña : '' } )
        setInfoCaso({... infoCaso, claves : claves})
    }

    const deleteClave = (e) => {
        console.log(e.target.className);
        const ind = claves.findIndex(cla => cla.nombre === e.target.className)
        if(ind === -1) return
        claves.splice( ind, 1 )
        setInfoCaso({...infoCaso, claves : claves})
    }
    // console.log('hola');
    // console.log(claves);
    // console.log(infoCaso);
    return (
        <div className="info-claves">
            {claves.map(clav => (
                <div key={clav.nombre} className="claves-items">
                    <div className="claves-datos">

                        <div className="clave-item">
                                <label>Cuenta:</label>
                                {isEditing 
                                ? ( <input className={clav.nombre}  type="text" name="nombre" value={clav.nombre} onChange={changeClaves} />)
                                : ( <span>{clav.nombre}</span>)
                                }   
                        </div>

                        <div className="clave-item">
                            <label>Contraseña:</label>
                            {isEditing 
                            ? ( <input className={clav.nombre} type="text" name="contraseña" value={clav.contraseña} onChange={changeClaves} />)
                            : ( <span>{clav.contraseña}</span>)
                            }
                        </div>

                    </div>

                    <div className="clave-eliminar">
                        <button className={clav.nombre} onClick={deleteClave}>
                            <i>X</i>
                        </button>
                    </div>

                </div>
            ))}

            <button className="button-agregar-clave" onClick={addClave}>Agregar clave</button>
        </div>
    )

}