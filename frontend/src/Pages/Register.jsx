import React, { useState } from 'react';
import Axios from 'axios'
import '../App.css';
import { useNavigate } from "react-router-dom"
import Navbar from '../Components/Navbar';

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const register = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3001/users', {username: username, password: password})
        .then((response) => {
            console.log(response)
            navigate('/login')
        })
    }


    return (
        <div className="home-container">
            <Navbar />
            <h1>Register Here!</h1>
            <form className="home-container">
                <label>Username</label>
                <input type='text' onChange={(e) => { setUsername(e.target.value) }} ></input>
                <label>Password</label>
                <input type='text' onChange={(e) => { setPassword(e.target.value) }} ></input>
                <br/>
                <button onClick={register}>Register</button>
            </form>
        </div>
    );
}

export default Register;