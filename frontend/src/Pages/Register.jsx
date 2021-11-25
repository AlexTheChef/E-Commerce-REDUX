import React, { useState } from 'react';
import Axios from 'axios'
import '../App.css';
import { useNavigate } from "react-router-dom"
import Navbar from '../Components/Navbar';
import { useTranslation } from "react-i18next";

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const register = (e) => {
        e.preventDefault()
        Axios.post(`${process.env.REACT_APP_API}/users`, {username: username, password: password})
        .then((response) => {
            console.log(response)
            navigate('/login')
        })
    }

    const { t } = useTranslation();

    return (
        <div className="home-container">
            <Navbar />
            <h1>{t("Reg")}</h1>
            <form className="home-container">
                <label>{t("Username")}</label>
                <input type='text' onChange={(e) => { setUsername(e.target.value) }} ></input>
                <label>{t("Password")}</label>
                <input type='text' onChange={(e) => { setPassword(e.target.value) }} ></input>
                <br/>
                <button onClick={register}>{t("Register")}</button>
            </form>
        </div>
    );
}

export default Register;