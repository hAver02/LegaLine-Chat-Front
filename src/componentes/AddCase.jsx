
import { useForm } from 'react-hook-form'
import { addCase } from '../api/auth';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
export function AddCase ({ setPageAddCaso }) {

    const { register, handleSubmit } = useForm()
    const {setRefresh, user} = useContext(UserContext)
    const mappedAmigos = user.amigos.map(friend => ({
        id : friend._id,
        email : friend.email
    }))
    console.log(mappedAmigos);

    const [amigosCaso, setAmigosCaso] = useState([])

    const handleCaso = (e) => {
        // console.log(e);
        const casoAmigos = structuredClone(amigosCaso)
        // console.log(casoAmigos);
        if(e.target.checked){
            casoAmigos.push(e.target.className)
        }else{
            const index = casoAmigos.findIndex(caso => caso == e.target.className)
            // console.log(index);
            casoAmigos.splice(index, 1)
        }
        // console.log(casoAmigos);
        setAmigosCaso(casoAmigos)
    }
    return (
        <div className='container-addcase'>
            <div className='addcase-header'>
                <h2>Agregrar un nuevo caso</h2>
                <button onClick={() => setPageAddCaso(false)}>Volver al inicio</button>
            </div>
            <form className='form-addcase' onSubmit={handleSubmit(async (values) => {
                console.log(values);
                const rta = await addCase(values, amigosCaso)
                console.log(rta);
                if(rta.data.ok){
                    setPageAddCaso(false)
                    setRefresh(true)
                }
            })}>
                <div className="form-addcase-personal">
                    <input type="text" placeholder='nombre' {...register('nombre', {required : true})} />
                    <input type="text" placeholder='apellido' {...register('apellido', {required : true})} />
                    <input type="number" placeholder='documento' {...register('documento', {required : true})} />
                    <input type="number" placeholder='cuil' {...register('cuil', {required : true})} />
                    <input type="date" {...register('fechaNac', {required : true})} />
                </div>
                <div className='form-jubilacion'>
                    <div className='form-reco'>
                        <div>
                            <label>Reconocimiento ANSES</label>
                            <input type="checkbox" {...register('recoAnses')} />
                        </div>
                        <div>
                            <label>Reconocimiento IPS</label>
                            <input type="checkbox" {...register('recoIPS')} /> 
                        </div>
                    </div>
                    <div className='form-tipojubilacion'>
                        <label>Tipo de jubilacion</label>
                        <select {...register('tipoJubilacion')}>
                                <option value="OTRA">OTRA</option>
                                <option value="DOCENTE IPS">DOCENTE IPS</option>
                                <option value="IPS">IPS</option>
                                <option value="ANSES">ANSES</option>
                                <option value="MIXTA IPS-ANSES">MIXTA IPS-ANSES</option>
                                <option value="MIXTA ANSES-IPS">MIXTA ANSES-IPS</option>
                        </select>
                    </div>
                </div>
                {mappedAmigos.length && 
                <div className='form-case-addfriend'>
                    <label>Agregar amigos al caso</label>
                    <ul className='addfriend-lista'>
                        {mappedAmigos.map(friend => (
                            <div key={friend.id}>
                                <label>{friend.email}</label>
                                <input className={friend.id} type='checkbox' onChange={handleCaso}/>
                            </div>
        
                        ))}
                    </ul>
                </div>}

                <button type='submit'>Crear caso</button>

            </form>
        </div>
    )
}