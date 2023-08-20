import { useEffect, useState } from "react";
import { addFriend } from '../api/auth';
import { logOut } from "../api/auth";
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
export function DropMenu () {

    const [isOpen, setIsOpen] = useState(false);
    const [ agregarAmigo, setAgregarAmigo ] = useState(false)
    const [error, setError ] = useState(false)
    const [solicitud, setSolicitud ] = useState(false)

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleAddFriendForm = () => {
        setAgregarAmigo(!agregarAmigo)
    };
    
    useEffect(() => {
        if(!error && !solicitud) return
        if(error){
            setTimeout(() =>{
                setError(false)
                setIsOpen(false)
                setAgregarAmigo(false)
            }, 2000)
        }
        if(solicitud){
            setTimeout(() =>{
                setSolicitud(false)
                setIsOpen(false)
                setAgregarAmigo(false)
            }, 2000)
        }
    },[error, solicitud])
    
    return (
        <div className="dropdown-menu">
        <button className="menu-button" onClick={toggleMenu}>
            <i>Menu</i>
        </button>
        {isOpen && (
            <div className="options">
            <button className="option" onClick={() => {
                setAgregarAmigo(true) 
                setIsOpen(false)
            }}>
                Agregar amigos
            </button>
            <button className="option" onClick={async () => {
                const rta = await logOut()
                navigate('/login')
            }}>
                Logout
            </button>
            </div>
        )}
        {agregarAmigo && (
                    <form className="add-friend-form" onSubmit={handleSubmit(async (values) => {
                        // console.log(values);
                        const rta = await addFriend(values.emailFriend)
                        console.log(rta);
                        if (!rta.data.ok) setError(true)
                        else setSolicitud(true)                        
                    })}>
                        <div className="add-friend-input">
                            <label>Ingrese el mail del usuario</label>
                            <input type="email" placeholder="Correo electrónico" {...register('emailFriend', { required : true })}/>
                        </div>

                        {error && <p>User no valido</p>}
                        {solicitud && <p>Usuario agregado correctamente</p>}

                        <div className="add-friend-button">
                            <button className="cancel-button" onClick={toggleAddFriendForm}>
                            Cancelar
                            </button>
                            <button type="submit" className="add-button">Agregar</button>
                        </div>
                </form>
        )}
        </div>

    );
};