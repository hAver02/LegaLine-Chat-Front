// import { set } from "mongoose"
import { useContext, useEffect, useState } from "react"
import { formatDateToYYYYMMDD } from "../utils/formatear.Date"

import io from 'socket.io-client'
import { UserContext } from "../context/userContext"
import { Message } from "./Message"
import { SinImagenes } from "./SinImagenes"
import { FormularioChat } from "./FormularioChat"

const socket = io("http://127.0.0.1:3000")

export function Chat ({ chat, idUser }) {
    const { user, idCaso, casos } = useContext(UserContext)

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [usersChat, setUserChat ] = useState([])
    const [forms, setForms] = useState('')

    // AGREGAR ALARMAS AL CHAT.
    const informacionCasoChat = casos.filter(caso => caso._id == idCaso[0])
    console.log(informacionCasoChat);

    
    const miembros = usersChat.map(user => (user.nombre)).join(', ')

    useEffect(() => {
        // hacerlo con axios.
        fetch(`http://127.0.0.1:3000/message?chat=${chat[0]}`)
        .then(res => res.json())
        .then((data) => {
            // console.log(data);
            if (data.ok) return setMessages(data.messages)
            if (data.messages.includes('sin mensaje')) setMessages([]);
        });

        fetch(`http://127.0.0.1:3000/chat/${chat[0]}`)
        .then(res => res.json())
        .then(data => {
            if(data.ok){
                // console.log(data.chat);
                const otherUsers = data.chat.users.filter(user => user._id != idUser)
                // console.log(otherUsers);

                setUserChat(otherUsers.map(user =>( {nombre : user.nombre, id : user._id} )))
        } 
        })
    }, [chat])

    useEffect(() => {
        // esperar los otros mensajes
        socket.on('message', data => {
            console.log(data);
            if (data.chat === chat[0]){
                console.log('agregando');
                receiveMessage(data)
                return
            }
            return
        })

        return () => {
            socket.off('message' , data => {
                console.log(data);
                if (data.chat === chat[0]){
                    console.log('agregando');
                    receiveMessage(data)
                    return
                }
                return
            })
        }

    }, [])

    const receiveMessage = mess => {
        setMessages(state => [...state, mess])
    }

    const changeValue = (e) => {
        setMessage(e.target.value)
    }

    const whoSent = (email) =>{
        if(!email) return true
        if(email === user.email) return true
        return false
    }
    // console.log(idCaso);
    return(
        <section className="main-chat">
            <header className="header-chat">
                <button onClick={() => setForms('alarma')}>Agregar alarma</button>
                <div>
                    <h2>{`${chat[1]}`}</h2>
                    <div className="info-chat">
                        {usersChat.length > 0 ? <p>{miembros} y tu</p> : <p>Tú</p>}
                    </div>
                </div>
                <button onClick={() => setForms('amigo')}>Agregar amigo</button>
            </header>
            {forms === '' ? 
            <section className="chat">        
                {messages.length === 0 ? <SinImagenes /> :
                <div className="container-messages">
                    <ul className="messages">
                        {messages.map((mess, i) => (
                            <li key={i} className={whoSent(mess?.user?.email) ? 'myMessage' : 'otherMessage'}>
                            <Message mess={mess} whoSent={whoSent}/>
                        </li>
                        ))}
                    </ul>
                </div>
                }
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const fecha = new Date()
                    const completeMessage = {
                        user : idUser,
                        message : message,
                        chat : chat[0],
                        date : fecha
                    }
                    setMessages([...messages, completeMessage])
                    socket.emit('message', completeMessage)
                    setMessage('')
                }}>
                    <input type="text" onChange={changeValue} value={message}/>
                </form>
            </section> : <FormularioChat forms={forms} setForms={setForms} idCaso={idCaso} usersChat={usersChat} chat={chat} setUserChat={setUserChat}/>}
        </section>
    )
}