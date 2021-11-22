import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import '../App.css';
import { useNavigate, Link } from "react-router-dom"
import Navbar from '../Components/Navbar';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'

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
        Axios.post('http://localhost:4000/login', { username: username, password: password })
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

    return (
        <div className="home-container">
            <Navbar />
            <h1>Login Here!</h1>
            <form className="home-container">
                <label>Username</label>
                <input type='text' onChange={(e) => { setUsername(e.target.value) }} ></input>
                <label>Password</label>
                <input type='text' onChange={(e) => { setPassword(e.target.value) }} ></input>
                <br />
                <button onClick={login}>Login</button>
                <br />
                <Link to={'/register'}><button>Sign up</button></Link>
            </form>
        </div>
    );
}

export default Login;