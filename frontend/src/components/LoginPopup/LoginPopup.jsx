import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState("Login")

  return (
    <div className='login-popup'>
      <form  className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Sign Up" && <input type="text"  placeholder='Name' required/>}
            <input type="text"  placeholder='Email' required />
            <input type="text"  placeholder='Password' required />
        </div>
        <button>{currentState==="Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By creating an account, I consent to the processing of my personal data in accordance with the <span>Privacy Policy</span></p>
        </div>
        {currentState==="Sign Up" && <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>}
        {currentState==="Login" && <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
