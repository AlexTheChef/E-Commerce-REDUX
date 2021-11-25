import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from '../Pages/Cart';
import App from '../Pages/App'
import Error from '../Pages/Error';
import SinglePage from '../Pages/SinglePage';
import Register from '../Pages/Register';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard';
import i18n from "i18next";

function Pages() {

    const [language, setLanguage] = useState(localStorage.getItem('lang'))

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [language])

    //Redux
    const logedIn = useSelector((state) => state.isLogin)
    //Redux
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/dashboard' element={<ProtectedRoute isAuth={logedIn} component={Dashboard} />} ></Route>
                    <Route exact path='/login' element={<Login />}></Route>
                    <Route exact path='/register' element={<Register />}></Route>
                    <Route path="*" element={<Error />}></Route>
                    <Route exact path='/' element={<ProtectedRoute isAuth={logedIn} component={App} />} ></Route>
                    <Route exact path='Cart' element={<ProtectedRoute isAuth={logedIn} component={Cart} />} ></Route>
                    <Route exact path='/products/:id' element={<ProtectedRoute isAuth={logedIn} component={SinglePage} />} ></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default Pages;