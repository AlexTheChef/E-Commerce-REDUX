import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css';
import { useNavigate, Link } from "react-router-dom"
import Navbar from '../Components/Navbar';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'
import { useTranslation } from "react-i18next";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [access, setAccess] = useState('')
    const [refresh, setRefresh] = useState('')
    const navigate = useNavigate()

    //Redux
    const dispatch = useDispatch()
    const { isLogin } = bindActionCreators(actionCreators, dispatch)
    //Redux
    
    const login = (e) => {
        e.preventDefault()
        Axios.post(`${process.env.REACT_APP_AUTH_API}/login`, { username: username, password: password })
            .then((data) => {
                const { accessToken, refreshToken } = data.data
                setAccess(accessToken)
                setRefresh(refreshToken)
                isLogin(1)
                navigate('/')
            })
    }

    useEffect(() => {
        const data = localStorage.getItem('access')
        if (data) {
            setAccess(JSON.parse(data))
        }
        const data2 = localStorage.getItem('refresh')
        if (data2) {
            setRefresh(JSON.parse(data2))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
    }, [access, refresh])

    const { t } = useTranslation();

    return (
        <div className="home-container">
            <Navbar />
            <h1>{t("Login")}</h1>
            <form className="home-container">
                <label>{t("Username")}</label>
                <input type='text' onChange={(e) => { setUsername(e.target.value) }} ></input>
                <label>{t("Password")}</label>
                <input type='text' onChange={(e) => { setPassword(e.target.value) }} ></input>
                <br />
                <button onClick={login}>{t("Log")}</button>
                <br />
                <Link to={'/register'}><button>{t("Register")}</button></Link>
            </form>
        </div>
    );
}

export default Login;