import React from 'react'
import {MdAdd, MdClose, MdHome, MdLogout} from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate()
  const DeleteAll=()=>{
    fetch('http://localhost:8080/deleteAll', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token")
              },

            }).then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.error) {
                        alert(data.error.message)
                        return
                    }
                    else {
                        alert('all Notes deleted successfully');
                    }
                }).catch(e => console.log(e))
        
  }
  const handleLogOut=()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div className='navbar'>
    <div style={{textAlign:"left"}} className="navb py-4" >
       <div onClick={()=>navigate("/notes")}>
        <span><MdHome/></span>
        Home
       </div>
       <div onClick={()=>navigate("/addNote")} >
        <MdAdd/>
        Add
       </div>
       <div onClick={()=>DeleteAll()}>
        <MdClose/>
        DeleteAll
       </div>
       <div>
        <MdLogout/>
        ExportPdf
       </div>
      
    </div>
     <div className='logout-btn ms-3' onClick={()=>handleLogOut()}>Logout
     </div>
     </div>
  )
}
