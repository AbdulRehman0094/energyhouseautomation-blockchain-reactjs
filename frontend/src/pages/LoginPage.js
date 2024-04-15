import React from 'react'
import { useState } from 'react';
import { isOwnerExist } from '../energyhouse';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const[address,setAddress]=useState('')
    const navigate= useNavigate();

    const inputChange=(e)=>{

        setAddress(e.target.value);

    }

    const loginHandler= async()=>{

       const result= await isOwnerExist(address);
       if(result)
       {
        navigate('/dashboard')
       }
       else{
        alert('Not Registered User! Please Register First')
       }

    }
  return (
    <div className='backcss'>
        
        <div className="custom-form-container">
      <div className="custom-logo-container">
        Login
      </div>

      <form className="custom-form">
        <div className="custom-form-group">
          <label htmlFor="email">OwnerAddress</label>
          <input type="text" id="" name="" placeholder="Enter your OwnerAddress" required="" onChange={inputChange}/>
        </div>

        <button className="custom-form-submit-btn" type="submit" onClick={loginHandler}>Login</button>
      </form>
    </div>
    </div>
    
  )
}

export default LoginPage
