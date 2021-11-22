import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'


function Navbar({ login }) {

    //Redux
    const dispatch = useDispatch()
    const { isLogin } = bindActionCreators(actionCreators, dispatch)
    //Redux

    const logOut = () => {
        isLogin(0)
        localStorage.setItem('access', JSON.stringify(''))
        localStorage.setItem('refresh', JSON.stringify(''))
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-home">  <h3>Home</h3> </Link>
            <div className="nav-right">
                {login ? <button className="nav-btn" onClick={logOut} >Log Out</button> : <span></span>}
                <Link to="/Cart" className="navbar-cart"> <h4>Cart</h4> </Link>
            </div>

        </nav>
    );
}

export default Navbar;