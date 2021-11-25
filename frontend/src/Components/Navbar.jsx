import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'
import i18n from "i18next";
import { useTranslation } from "react-i18next";

function Navbar({ login }) {

    //Redux
    const dispatch = useDispatch()
    const { isLogin } = bindActionCreators(actionCreators, dispatch)
    //Redux

    const { t } = useTranslation();
    const [lang, setLang] = useState('')

    const logOut = () => {
        isLogin(0)
        localStorage.setItem('access', JSON.stringify(''))
        localStorage.setItem('refresh', JSON.stringify(''))
    }

    const onChange = (e) => {
        i18n.changeLanguage(e.target.value)
        setLang(e.target.value)
    }

    useEffect(() => {
        const data = localStorage.getItem('lang')
        if (data) {
            setLang(data)
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('lang', lang)
    }, [lang])

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-home">  <h3>{t("Home")}</h3> </Link>
            <div className="nav-right">
                <select name='language' className="selector" onChange={onChange} >
                    <option value='en'>English</option>
                    <option value='srb'>Srpski</option>
                </select>
                {login ? <button className="nav-btn" onClick={logOut} >{t("Logout")}</button> : <span></span>}
                <Link to="/dashboard" ><button className="nav-btn" >{t("Dashboard")}</button></Link>
                <Link to="/Cart" className="navbar-cart"> <h4>{t("Cart")}</h4> </Link>
            </div>
        </nav>
    );
}

export default Navbar;