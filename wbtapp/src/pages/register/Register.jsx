import React from 'react'
import "./register.css"
import { useRef } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router";
import { Link } from 'react-router-dom';

 const Register=() => {
    const username =useRef(); 
    const email=useRef(); 
    const mobile =useRef(); 
    const password=useRef();
    const passwordAgain=useRef();
     const history =useNavigate();

    const handleClick= async(e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !==password.current.value)
        {
            passwordAgain.current.setCustomValidity("Password Don't Match");

        }
        else{
            const user={
                username:username.current.value,
                email:email.current.value,
                mobile:mobile.current.value,
                password:password.current.value,
            }
            try
            {
              await axios.post("/auth/register" ,user);
               history("/login") 
            }
            catch (err)
            {
                console.log(err);
            }
          

        }
    }



    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                  <h3 className='loginLogo'>HANDYBRANDS</h3>
                  <span className='loginDesc'>
                      Your Imagination, Our Innovation.
                  </span>
                </div>
                
                <div className="loginRight">
                    <form  className="loginBox" onSubmit={handleClick}>
                <input  placeholder="&#xf007; Username" required ref={username} className="loginInput" />
                    <br />
            <input placeholder="&#xf0e0; Email" required ref={email} className="loginInput" type="email"/>
            <br />
            <input placeholder="&#xf10b; Mobile" required minLength="10" ref={mobile} className="loginInput" />
            <br />
            <input placeholder="&#xf023; Password" required minLength="6" ref={password} className="loginInput" type="password" />
            <br />
            <input placeholder="&#xf023; Confirm Password" required ref={passwordAgain} className="loginInput" type="password" />
            <br />
            
            <button className="loginButton" type="submit">Sign Up</button><br/>
            
            <Link to={"/login"}>
            <button className="loginRegisterButton">
              Login into Account
            </button>
            </Link>
                    </form>
                </div>

            </div>
            
        </div>
    );
}

export default Register;