// Login.jsx
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { account } from "../appwrite/config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let [loginFailed, setLoginFailed] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const Navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email == "" || formData.password == ""){
        alert("Please give correct emai password")
    }
    else{
        login()
        

    }
  };

  const login = async()=>{
    try
    {
        var x = await account.createEmailPasswordSession(formData
            .email, formData.password)
        setLoginFailed(false)
        console.log(x)
        Navigate("/Dashboard")
        
    }
    catch(e){
        console.log("Error logging in", e)
        setLoginFailed(true)
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <img src="lock.svg" alt="Login" className="login-image" />
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>

          {loginFailed && (
            <div className="error Message">
                Invalid Credentials. Please try agin
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
