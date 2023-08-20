
import { Chat } from '../componentes/Chat'
import { ListaDeCasos } from '../componentes/ListaDeCasos'
import { Alarmas } from '../componentes/Alarmas'
import { Header } from '../componentes/Header'
import  { InfoCaso } from '../componentes/infocasos/InfoCaso'
import { AddCase } from '../componentes/AddCase'


import Cookies from 'js-cookie'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { validateToken } from '../api/auth'


export function Main () {

    const [pageAddCaso, setPageAddCaso] = useState(false)

    const { setIsLoading,setIdUser, setCasos,setUser,pageAlarmas, chat,  
    refresh, setRefresh,infoCaso, idUser, isAuth, setIsAuth}  = useContext(UserContext)

    // console.log(infoCaso);
    useEffect(() => {
        if(idUser == "") return 
        fetch(`http://127.0.0.1:3000/user/${idUser}`)
        .then(res => res.json())
        .then(data => {
            if(!data.ok) return // Mostrar algun tipo de error.
            setUser(data.user)
            setCasos(data.user.casos)
            if(refresh) setRefresh(false)
        })
        .catch(err => console.log(err))
    }, [idUser, refresh])   

    useEffect(() => {
        async function checkToken (){
            if(isAuth) return setIsLoading(false)
            setIsLoading(true)
            const cookies = Cookies.get()
            if(cookies?.token){
                const res = await validateToken(cookies)
                if (res.data.ok) {
                    setIdUser(res.data.id)
                    setIsAuth(true)
                }
            } 
            setIsLoading(false)
        }

        checkToken()

    },[refresh])
    // console.log(user);
    return (
      <div className='app-container'>
        <Header />      
        {pageAddCaso ? <AddCase setPageAddCaso={setPageAddCaso}/> :
        <section className='main'>
            <ListaDeCasos setPageAddCaso={setPageAddCaso}/>
            {infoCaso && <InfoCaso caso={infoCaso}/> || (pageAlarmas ? <Alarmas /> : <Chat chat={chat} idUser={idUser}/>) }
        </section>
        }
      </div>
  )
}