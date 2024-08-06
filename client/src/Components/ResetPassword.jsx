import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const ResetPassword = () => {

    const [password, setPassword] = useState("")
    const { token } = useParams()

    const navigate = useNavigate()


    // Function to submit the form and signUP
    const handleSubmit = (e) => {
        e.preventDefault()
        // Create a new User by post req at the API 
        Axios.post("http://localhost:3000/auth/reset-password/"+token , { password })
            .then(res => {
                if (res.data.status) {
                    navigate('/login')
                }
                console.log(res.data)
            })

            .catch(err => console.log(err))
    }


    return (
        <div className='sign-up-container'>
            <h2>RESET Password</h2>
            <form className="sign-up-form" onSubmit={handleSubmit}>

                <label htmlFor="password">New Password :</label>
                <input type="password" placeholder='****' onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default ResetPassword