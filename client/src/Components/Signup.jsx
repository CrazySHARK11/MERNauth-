import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()


    // Function to submit the form and signUP
    const handleSubmit = (e) => {
        e.preventDefault() 

        // Create a new User by post req at the API 
        Axios.post("http://localhost:3000/auth/signup", { username, email, password })
        .then(res => {if(res.data.status){
            
        //    Redirect us to the login page
            navigate('/login')
        }})
    
        .catch(err => console.log(err)) 
    }


    return (
        <div className='sign-up-container'>
            <h2>Signup</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username : </label>
                <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="username">Email : </label>
                <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password :</label>
                <input type="password" placeholder='****' onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Sign, up</button>
                 <p>Have an Account ?</p> <Link to="/login">LOGIN</Link>
            </form>
        </div>
    )
}

export default Signup