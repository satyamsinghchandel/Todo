import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Verify from './pages/Verify'
import Dashboard from './pages/Dashboard'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path = "/Verify" element = {<Verify/>}></Route>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/Register" element = {<Register/>}></Route>
        <Route path = "/Login" element = {<Login/>}></Route>
        <Route path = "/Dashboard" element = {<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
