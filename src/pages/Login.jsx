
import {set, useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginReques } from '../api/auth'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'

export function Login () {
    const { setIsAuth, setIdUser} = useContext(UserContext)
    const { register, handleSubmit } = useForm()
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(loginError){
            setTimeout(() => {
                setLoginError('')
            }, 3000)
        }
    }, [loginError])

    return (
        <div className='container-login'>

        <div className='login'>
            <h1>Iniciar Sesion</h1>
            {loginError && <p className='mensaje-error'>{loginError}</p>}
            <form className='login-form' onSubmit={handleSubmit(async (values) => {
                try {
                    const rta = await loginReques(values)
                    // console.log(rta);
                    if(rta.data.ok){
                        setIsAuth(true)
                        setIdUser(rta.data.userID)
                        navigate('/')
                    }else{
                        setLoginError(rta.data.message.toUpperCase())
                    }
                } catch (error) {
                    console.log(error);
                }
            })}>
                <div className='login-datos'>
                    <input type="text" placeholder='email' {...register('email', { required : true})}/>
                    <input type="password" placeholder='password' {...register('password', { required : true})}/>
                </div>
                <button type='submit'>Iniciar sesion</button>
            </form>

            <p className="login-link">¿Necesitas crear una cuenta? <Link to={'/register'}>Registrarse</Link></p>
        </div>
        
        </div>
    )

}