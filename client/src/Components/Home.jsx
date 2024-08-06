import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

 

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  useEffect(()=>{
   axios.get('http://localhost:3000/auth/verify')
   .then(res => {
      if(res.data.status){
      } else{
          navigate('/login')
      }
   })
  },[])
     
     const handleLogout = () =>{
      axios.get('http://localhost:3000/auth/logout')
      .then(res=> {
        if(res.data.status){
            
        }
      })
      .catch(err => {
        console.log(err)
      })
     }

  return (
    <div>
        HOME <br />
          
        <button>
            <Link to="/dashboard">Dashboard</Link>
        </button>
        <br />
        <button onClick={handleLogout}> Logout </button>
    </div>
  )
}

export default Home