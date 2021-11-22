import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from '../Pages/Cart';
import App from '../Pages/App'
import Error from '../Pages/Error';
import SinglePage from '../Pages/SinglePage';
import Register from '../Pages/Register';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux'
import Login from '../Pages/Login'

function Pages() {

    //Redux
    const logedIn = useSelector((state) => state.isLogin)
    //Redux
    return (
        <div>
            <Router>
                <Routes>
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