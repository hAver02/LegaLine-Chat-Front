

import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";




export function Register(){

const { setIdUser, setIsAuth } = useContext(UserContext)
const {register, handleSubmit} = useForm()
const navigate = useNavigate()
const [registerError, setRegisterErrror] = useState('')

useEffect(() => {
    if(registerError){
        setTimeout(() => {
            setRegisterErrror('')
        }, 3000)
    }
}, [registerError])
return (
        <div className="container-register">
            <div className="register">
                <h2>FORMULARIO DE REGISTRO</h2>
                {registerError && <p className="register-error">{registerError}</p>}
                <form   className="register-form"
                        onSubmit={handleSubmit(async (values) => {
                            // console.log(values);
                            const rta = await registerRequest(values)
                            console.log(rta.data);
                            if(rta.data.ok) {
                                setIdUser(rta.data.userID)
                                navigate("/")
                                setIsAuth(true)
                            }else{
                                if (rta.data.message.includes('duplicate')) return setRegisterErrror('Email utilizado anteriormente')
                                setRegisterErrror('Error al crear usuario. Intente nuevamente')
                            }
                        })}
                        >
                        <div className="register-datos">
                            <input type="text" placeholder="Nombre" {...register("nombre", {required : true}) }/>
                            <input  placeholder="Email" type="email "{...register("email", {required : true}) }/>
                            <input placeholder="Password" type="password"{...register("password", {required : true}) }/>
                        </div>
                        <button type="submit">Registrarse</button>
                </form>             
                <p>¿Ya tienes una cuenta? <Link to={'/login'}>Login</Link></p>
            </div>

        </div>
)}
