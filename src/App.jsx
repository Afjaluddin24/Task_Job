import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './User/Login'
import Registe from './User/Registe'
import Dashboard from './User/Dashboard'

function App() {

  return (
    <BrowserRouter>
         <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/Registen" element={<Registe/>} />
                <Route path="/Dashboard" element={<Dashboard/>} />
         </Routes>
    </BrowserRouter>
  )
}

export default App
