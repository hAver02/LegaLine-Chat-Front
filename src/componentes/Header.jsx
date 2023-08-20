import { useContext, useState } from "react"

import { DropMenu } from "./DropMenu"
import { UserContext } from "../context/userContext"

export function Header () {
    
    const {setInfoCaso, setPageAlarmas } = useContext(UserContext)
    return(
        <header className="header">
            <h2 onClick={() => {
                setInfoCaso('')
                setPageAlarmas(true)
            }} className="logo"> MM ABOGADOS</h2>
            <div className="section-derecha">
                {/* <div>
                    {!addFriend && <button onClick={() => setAddFriend(true)}>Agregar amigo</button>}
                    {addFriend && <FormAgregarAmigo setAddFriend={ setAddFriend }/>} 
                </div>
                <button onClick={logOut}>Cerrar Session</button> */}
                <DropMenu />
            </div>

        </header>
    )
}