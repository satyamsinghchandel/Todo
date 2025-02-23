import React, { useEffect } from 'react'
import { account } from '../appwrite/config'
import './home.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
function Home() {
  useEffect(()=>{
    console.log(account)
  }, [])
  const navigate = useNavigate()
  return (
    <div className="homepage-container">
      <section className="intro-section">
        <h1>Welcome Home</h1>
        <div className="button-group">
          <button onClick ={()=>navigate('/login')} className="login-button">Login</button>
          <button onClick={()=>navigate("/Register")} className="signup-button">Register</button>
        </div>
      </section>
    </div>
  )
}

export default Home
