import React, { useState } from 'react'
import "./user.css"

import { Link, useNavigate } from 'react-router-dom';



export default function Registration() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPass, setConPass] = useState("")
  const [agree, setAgree] = useState(false);
  const [err,setErr] = useState("")
  const handleRegister = ()=>{
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email || !password || !conPass){
                setErr('please add all the fields*')
                return
            }
            if(!email===""){
                if(!emailRegex.test(email)){
                    setErr('please enter a valid email')
                    return
                }
            }
            if(password.length<7){
                setErr('password must be greater than 7 characters');
                return
            }
            if(password!==conPass){
                setErr('password not matched')
              return
            }
            else{
              setErr("")
                fetch('http://localhost:8080/signup',{
                    method: 'post',
                    mode : "cors",
                    headers : {
                        'Content-Type' : 'Application/json',                 
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }).then(res=>{
                    return res.json();
                }).then(data=>{
                  if(data.error){
                    alert(data.error)
                  }else{
                    console.log(data);
                    alert(data.message)
                       navigate('/login')
                  }
                 
                }).catch(e=>console.log(e))            
            }
}
  return (
    <div className='reg-container'>
      <div className='reg-main'>
        <h1 className='mt-4'>SIGN UP</h1>
        <div className='input-container'>
          <div className='reg-div'>
            <input type="text" placeholder='EMAIL' onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className='reg-div'>
            <input type="password" placeholder='PASSWORD' onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className='reg-div'>
            <input type="password" placeholder='REPEAT PASSWORD' onChange={(e) => { setConPass(e.target.value) }} />
          </div>
          {err?<p style={{color:"red"}}>{err}</p>:null}
          <div className="checkbox mt-3">
            <input type="checkbox" onChange={(e) => { setAgree(e.target.checked) }} checked={agree} /> I agree with the <a style={{ color: "black"}} href="#">TERMS & CONDITIONS</a>
          </div>
          <div className='reg-btn mt-4'>
            <button type="submit" disabled={!agree}  className='px-4 py-2' onClick={()=>{handleRegister()}}>Submit</button>
          </div>
          <div>
            already have an account ?
            <span>
              <Link to={"/login"}>signIn</Link>
            </span>
          </div>
        </div>

      </div>

    </div>
  )
}
