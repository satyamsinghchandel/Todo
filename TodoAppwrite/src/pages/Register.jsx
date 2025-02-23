import React, { useState } from "react";
import "./Register.css";
import { account } from "../appwrite/config";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name === "" || formData.email === "" || formData.password === "") {
        alert("please fill these fields")
        return
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegex.test(formData.email)){
        alert("Enter valid Email")
    }
    else{
        register()
    }
   
  };

  const register = async () => {
    try {
      // Creating user in Appwrite
      const {name, email, password} = formData
      var user = await account.create("unique()",  email, password, name);
      console.log(user);
      
      var session = await account.createEmailPasswordSession(email, password)
      var link = await account.createVerification("http://localhost:5173/Verify")
      alert("Verification send successfully")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
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
        
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
