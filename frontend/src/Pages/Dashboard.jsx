import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Axios from 'axios'
import { useNavigate } from "react-router-dom"
import '../App.css';

function Dashboard() {
    const [dashboard, setDashboard] = useState([])
    const navigate = useNavigate()
    const refresh = localStorage.getItem('refresh')

    useEffect(() => {
        getPurchases()
    },[])

    const getPurchases = () => {
        const access = localStorage.getItem('access')
        Axios.get(`${process.env.REACT_APP_API}/purchases`, {
            headers: {
                "Authorization": `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                console.log(data)
                setDashboard(data.data)
            })
            .catch((data) => {
                Axios.post(`${process.env.REACT_APP_AUTH_API}/token`, {
                    'token': refresh
                })
                    .then((data) => {
                        localStorage.setItem('access', data.data.accessToken)
                        Axios.get(`${process.env.REACT_APP_API}/purchases`, {
                            headers: {
                                "Authorization": `Bearer ${data.data.accessToken}`,
                                'Content-Type': 'application/json'
                            }
                        }).then(data => console.log('Sent!'))
                            .catch((data) => {
                                console.log(data)
                                navigate('/login')
                            })
                    })
            })
    }

    return (
        <div>
            <Navbar />
            <div>{dashboard.map((item) => (
                <div key={item.id} >
                    <div className="home-info ">Order ID: {item.id}</div>
                    <div> {item.products.map((item, index) => (
                        <div key={index} className='row'>{item.map((item) => (
                            <div key={item.id} className="home-size">
                                <div className="home-shadow">
                                <img className="home-img" src={item.img} alt="" />
                                    <div className="home-info ">
                                        <div>Quantity: x{item.quantity}</div>
                                        <div>${item.price}</div>
                                        <div>{item.title}</div>
                                    </div>
                                </div>
                            </div>
                        ))}</div>
                    ))}</div>
                </div>
            ))}</div>
        </div>
    );
}

export default Dashboard;