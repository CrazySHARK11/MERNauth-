import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()


    // Function to submit the form and signUP
    const handleSubmit = (e) => {
        e.preventDefault() 
        
        Axios.defaults.withCredentials = true;

        Axios.post("http://localhost:3000/auth/login", { email, password })
        .then(res => {if(res.data.status){
            
        //    Redirect us to the login page
            navigate('/home')
        }})
        .catch(err => console.log(err)) 
    }


    return (
        <div className='sign-up-container'>
            <h2>Login</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>
 
                <label htmlFor="email">Email : </label>
                <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password :</label>
                <input type="password" placeholder='****' onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>
                <Link to="/forgotPassword">Forgot Password ?</Link>
                 <p>Don't Have Account ?</p> <Link to="/signup">Sign up</Link>
            </form>
        </div>
    )
}

export default Login