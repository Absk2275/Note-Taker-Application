import React, { useState } from 'react'
import "./user.css"
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate()
  const handleLogin = () => {
    if (!email || !password) {
      setErr('please add all the fields*')
      return
    }
    else {
      fetch('http://localhost:8080/login', {
        method: 'post',
        mode: "cors",
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then(res => {
        return res.json();
      }).then(data => {
        if(data.error){
          console.log(data);
          alert(data.error)
        }
        else{
          console.log(data);
          localStorage.setItem('token',data.token);
          alert(data.message)
          navigate('/notes')
        }
        
      }).catch(e => console.log(e))
    }

  }
  return (
    <div className='lg-container'>
      <div className='lg-main'>
        <h1 className='mt-4'>SIGN IN</h1>
        <div className='inputlg-container'>
          <div className='lg-input'>
            Email
            <br />
            <input type="text" placeholder='EMAIL' onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className='lg-input'>
            Password
            <br />
            <input type="password" placeholder='PASSWORD' onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className="lg-checkbox mt-3">
            <input type="checkbox" onChange={(e) => { setAgree(e.target.checked) }} checked={agree} /> Remember me
          </div>
          <div className='lg-btn mt-4 text-center'>
            <button type="submit" disabled={!agree} className='px-4 py-2' onClick={() => { handleLogin() }}>Submit</button>
          </div>
          <div>
            <p>{err}</p>
          </div>
          <div className='frgt-pass'>
            forgot <a href='#'> password ?</a>
          </div>
        </div>

      </div>

    </div>
  )
}
