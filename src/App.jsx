
import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

import { UserProvider } from './context/userContext'
import { IsAuth, IsThereToken } from './pages/IsAuth'






function App() {
  return (
    <>

    <UserProvider>

      <BrowserRouter>
        <Routes>
          <Route element={<IsThereToken />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<IsAuth />}>
            <Route path='/' element={<Main />} />
          </Route>
          <Route path='*' element={<h1>not found</h1>}/>
        </Routes>
      </BrowserRouter>

    </UserProvider>
    </>
  ) 
}

export default App
