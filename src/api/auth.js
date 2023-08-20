import axios from './axios'

// const API = "http://127.0.0.1:3000/"

export const registerRequest = ( user ) => axios.post(`session/register`, user)
export const validateToken = (token) => axios.post('session/validateToken', token)
export const loginReques = ( user ) => axios.post('session/login', user)
export const logOut = () => axios.post('session/logout')



export const addCase = (caso, userChats) => axios.post('casos/', {caso : caso, userChats : userChats})
export const addAlarm = (idCase, idNotificacion) => axios.put(`casos/addAlarma/${idCase}/${idNotificacion}`)
export const updatedCaso = (newCase, idCase) => axios.put(`casos/${idCase}`, newCase)
export const getCase = (idCase) => axios.get(`casos/${idCase}`)

export const addFriend = (email) => axios.put(`user/addFriend/${email}`)
export const addCaseToUser = (idUser, idCase) => axios.put('user/addCase/user', {idUser, idCase})


export const addUserToChat = (idUser, idChat) => axios.put(`chat/${idChat}/addUser/${idUser}`)


export const createNoti = (notificacion) => axios.post('notificaciones/', notificacion)


export const getNotisById = (ids) => axios.get(`notificaciones/getAlarmas/${ids}` )