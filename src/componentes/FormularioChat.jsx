import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../context/userContext'
import { createNoti, addAlarm, addCaseToUser, addUserToChat } from '../api/auth'




export function FormAlarmas({ setForms }){
    const {register, handleSubmit} = useForm()
    const { idCaso, idUser, setCasos, casos } = useContext(UserContext)
    console.log(casos);
    const updatedCasos  = (alarmaID) => {
        const copyCasos = structuredClone(casos)
        const index = copyCasos.findIndex(caso => caso._id === idCaso[0])
        // console.log(index);
        copyCasos[index].alarmas.push(alarmaID)
        setCasos(copyCasos)
    }
    return (
        <div className='container-create-alarma'>
            <p>Crear una alarma para el caso '{idCaso[1]}'</p>
            <form className='form-create-alarma' onSubmit={handleSubmit(async (values) =>{
                const notificacion = {...values, creador : idUser, tipo : 'alarmas'}
                const rta = await createNoti(notificacion)
                if(rta.data.ok){
                    const { _id } = rta.data.notificacion
                    const rtaII = await addAlarm(idCaso[0], _id.toString())
                    //ACTUALIZAR CASOS
                    updatedCasos(_id.toString())
                    setForms('')
                }
            })}>
                <div>
                    <label>Titulo de la alarma</label>
                    <input type="text" {...register('mensaje', {required : true })}/>
                </div>
                <div>
                    <label>Vencimiento</label>
                    <input type="datetime-local" {...register('vencimiento', {required : true})} />
                </div>
                <button type='submit'>Crear alarma</button>
            </form>
        </div>
    )
}

export function FormAddFriend({usersChat, chat, setUserChat, setForms }){
    const { idCaso, user } = useContext(UserContext)

    const usuariosParaAgregar = () => {
        const idUsersChat = usersChat.map(user => user.id)
        const amigosParaAgregar = user.amigos.filter(user => !idUsersChat.includes(user._id))
        return amigosParaAgregar;
    }
    
    const addFriend = async (idUser, nombreUser) => {
        // console.log(e);
        const rta = await addCaseToUser(idUser, idCaso[0])
        console.log(rta);
        if (rta.data.ok) {
            const rtaII = await addUserToChat(idUser, chat[0] )
            console.log(rtaII);
            if(rtaII.data.ok){
                setUserChat([...usersChat, {id : idUser, nombre : nombreUser}])
                setForms('')
            }
        }
    

    }
    return (
        <div className='container-agregar-amigos'>
            <p>Agregue un nuevo amigo al caso {idCaso[1]}</p>
            {usuariosParaAgregar().length == 0 ? <p>No hay amigos posibles para agregar</p> :
            <div className='amigos-agregar-amigos'>
                {usuariosParaAgregar().map(usuario => (
                    <div className='agregar-amigo' key={usuario._id}>
                        <span>{usuario.email}</span>
                        <button className={usuario._id} onClick={(e) => addFriend(e.target.className ,usuario.nombre)}>
                            Agregar al caso
                        </button>
                    </div>
                ))}
            </div>
            }
        </div>
    )

}


export function FormularioChat({forms, setForms, usersChat, chat, setUserChat }){
    // console.log(forms);
    return(
        <section className='formulario-chat'>
            <div>
                <button className='button-atras' onClick={() => setForms('')}>
                    Volver al chat
                </button>
            </div>
            {forms === "alarma" 
            ? <FormAlarmas setForms={setForms}/> 
            : <FormAddFriend usersChat={usersChat}  chat={chat} setUserChat={setUserChat} setForms={setForms} />}
        
        </section>
    )
}