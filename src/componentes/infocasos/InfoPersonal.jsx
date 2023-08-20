

export function InfoPersonal ( { infoCaso, handleInputChange, isEditing } ) {
    // console.log(infoCaso);
    return (
        <form className="form-personal">
            <div className="items-personal">
              <label>Nombre:</label>
              {isEditing 
              ? ( <input type="text" name="nombre" value={infoCaso.nombre} required onChange={handleInputChange} />) 
              : ( <span>{infoCaso.nombre}</span> )
              }
            </div>

            <div className="items-personal">
              <label>Apellido:</label>
              {isEditing 
              ? ( <input type="text" name="apellido" value={infoCaso.apellido} required onChange={handleInputChange}/>) 
              : ( <span>{infoCaso.apellido}</span>)
              }
            </div>

            <div className="items-personal">
              <label>Fecha de Nacimiento:</label>
              {isEditing 
              ? ( <input type="date" name="fechaNac" value={infoCaso.fechaNac} required onChange={handleInputChange} /> ) 
              : ( <span>{infoCaso.fechaNac}</span>)
              }
            </div>

            <div className="items-personal">
              <label>DNI:</label>
              {isEditing 
              ? ( <input type="number" name="documento" value={infoCaso?.documento} required onChange={handleInputChange} />) 
              : ( <span>{infoCaso.documento}</span>)
              }
            </div>
            <div className="items-personal">
              <label>CUIL:</label>
              {isEditing 
              ? ( <input type="text" name="cuil" value={infoCaso?.cuil} required onChange={handleInputChange} />) 
              : ( <span>{infoCaso.cuil}</span>)
              }
            </div>
  
        </form>        
    )
}