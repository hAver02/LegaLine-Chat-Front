
import {createContext, useState, useEffect, useContext} from 'react'
// import {useNavigate} from 'react-router-dom'
export const UserContext = createContext()


export function UserProvider({children}){

    const [idUser, setIdUser ] = useState('')
    const [isLoading, setIsLoading ] = useState(true)
    const [user, setUser] = useState({})
    const [casos, setCasos] = useState([])
    const [pageAlarmas, setPageAlarmas] = useState(true) 
    const [chat, setChat] = useState([])
    const [infoCaso, setInfoCaso] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [idCaso, setIdCaso] = useState([])
    
    return (
        <UserContext.Provider value={{user, casos, setCasos, setUser, 
                                      pageAlarmas, setPageAlarmas, chat, setChat,
                                      infoCaso, setInfoCaso,setIdUser, idUser, isAuth, setIsAuth,
                                      isLoading, setIsLoading, refresh, setRefresh, idCaso, setIdCaso
                                      }}>
            { children }    
        </UserContext.Provider>
    )
}


