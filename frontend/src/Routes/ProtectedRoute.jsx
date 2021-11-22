import React from 'react';
import { Navigate } from 'react-router-dom'

function ProtectedRoute({component: Component, isAuth: login}) {
    return (       
        (login) ?
            <Component login={login}/>
            :
            <Navigate to={'/login'} />
    )
}

export default ProtectedRoute;