import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"



export function ListaDeCasos ({ setPageAddCaso }) {
    // const cantCasos = casos.lenght
    const { casos, setPageAlarmas, setChat, setInfoCaso, setIdCaso } = useContext(UserContext)
    const [ searchCaso, setSearchCaso ] = useState('')
    const filterCasos = casos.filter(caso => caso.apellido.toLowerCase().includes(searchCaso.toLowerCase()))
    const addCaso = () => {
        setPageAddCaso(true)
    }

    return(
        <aside className="main-casos">
            <div className="casos-search">
                <h3>Todos los casos</h3>
                <div>
                    <input type='text' placeholder="Busque un caso" onChange={(e) => setSearchCaso(e.target.value)}/>   
                    <button onClick={addCaso}>Crear un nuevo caso</button>
                </div>   
            </div>
            <div className="casos-chats">
                {/* VER SI HAY CASOS. */}
                <ul className="lista-casos">
                    {filterCasos.map(caso => (
                        <li key={caso?.apellido} className="container-casos">
                            <button className={caso?.chat}  onClick={(e) => {
                                setPageAlarmas(false)
                                setChat([e.target.className, e.target.textContent,])
                                setInfoCaso("")
                                setIdCaso([caso._id, caso.apellido])
                            }}>
                                {caso.apellido}
                            </button>
                            <button onClick={(e) => setInfoCaso(e.target.className)} className={caso?._id}>+</button>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </aside>
    )
}


