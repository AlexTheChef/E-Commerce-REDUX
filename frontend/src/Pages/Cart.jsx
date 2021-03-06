import React from 'react';
import '../App.css';
import Navbar from '../Components/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'
import Axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next";

function Cart(props) {
  //Redux
  const store = useSelector((state) => state.store)
  const dispatch = useDispatch()
  const { addToCart, onRemove, emptyCart } = bindActionCreators(actionCreators, dispatch)
  //Redux

  const totalPrice = store.reduce((prev, now) => prev + now.quantity * now.price, 0);
  const navigate = useNavigate()
  const refresh = localStorage.getItem('refresh')

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

  const sendPurchases = () => {
    const access = localStorage.getItem('access')
    Axios.post(`${process.env.REACT_APP_API}/purchases`, {
      products: [store]
    },
      {
        headers: {
          "Authorization": `Bearer ${access}`,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((data) => {
        console.log(data)
        console.log(access)
      })
      .catch((data) => {
        Axios.post(`${process.env.REACT_APP_AUTH_API}/token`, {
          'token': refresh
        })
          .then((data) => {
            localStorage.setItem('access', data.data.accessToken)
            Axios.post(`${process.env.REACT_APP_API}/purchases`, {
              products: [store]
            },
              {
                headers: {
                  "Authorization": `Bearer ${data.data.accessToken}`,
                  'Content-Type': 'application/json'
                }
              }
            ).then(data => console.log('Sent!'))
              .catch((data) => {
                console.log(data)
                navigate('/login')
              })
          })
      })
  }
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <Navbar />
      <div>{store.length === 0 && <h1>{t("CartIsEmpty")}</h1>}</div>
      {store.map((item) => (
        <div key={item.id} className="cart-container">
          <div className="cart-title">{item.title}</div>
          <div className="cart-btn">
            <button onClick={() => onRemove(item)} className="remove">-</button>
            <button onClick={() => addToCart(item)} className="add">+</button>
          </div>

          <div className="cart-price">
            {item.quantity} x ${item.price}
          </div>
        </div>
      ))}

      {store.length !== 0 && (
        <div className='cart-info'>
          <hr></hr>
          <div className="total-price">
            <div >
              <strong>{t("TotalPrice")}</strong>
            </div>
            <div >
              <strong>${totalPrice}</strong>
            </div>
          </div>
          <hr />
          <div className='cart-buttons'>
            <button className="home-btn" onClick={() => sendPurchases()}>
            {t("Checkout")}
            </button>
            <button className="home-btn" onClick={() => getPurchases()}>{t("Refresh")}</button>
            <button className="home-btn-red" onClick={() => emptyCart()}>{t("Empty")}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;