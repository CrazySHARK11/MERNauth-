import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const ForgotPassword = () => {

    const [email, setEmail] = useState()
 
    const navigate = useNavigate()


    // Function to submit the form and signUP
    const handleSubmit = (e) => {
        e.preventDefault() 

        // Create a new User by post req at the API 
        Axios.post("http://localhost:3000/auth/forgot-password", {email})
        .then(res => {if(res.data.status){
            
       alert("Check Your Email")
            navigate('/login')
        }
        console.log(res.data)
    })
    
        .catch(err => console.log(err)) 
    }


  return (
    <div className='sign-up-container'>
    <h2>Forgot Password</h2>
    <form className="sign-up-form" onSubmit={handleSubmit}>
        
        <label htmlFor="username">Email : </label>
        <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
 
        <button type="submit">Send</button>
    </form>
</div>
  )
}

export default ForgotPassword