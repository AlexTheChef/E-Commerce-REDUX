import React, { useState, useEffect } from 'react';
import data from '../Data/Data';
import '../App.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'
import { useTranslation } from "react-i18next";

function Home() {
  const { productData } = data;
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) {
      params.append("search", searchTerm)
    } else {
      params.delete("search")
    }
    navigate({ search: params.toString() })
  }, [searchTerm, navigate])

  //Redux
  const dispatch = useDispatch()
  const { addToCart } = bindActionCreators(actionCreators, dispatch)
  //Redux

  const { t } = useTranslation();

  return (
    <div className="home-container">
      <h1>{t("AllItems")}</h1>
      <input className='search' onChange={e => { setSearchTerm(e.target.value) }} name='search' type='text' placeholder={t("search")} />
      <section>
        <div className='home-row'>
          {productData.filter(val => {
            if (searchTerm === "") {
              return val
            } else {
              if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            }
          }
          ).reverse().map((item) => {
            return (
              <div className="home-size" key={item.id}>
                <div className="home-shadow">
                  <Link to={`/products/${item.id}`} ><img className="home-img" src={item.img} alt="" /></Link>
                  <div className="home-info ">
                    <h5>{item.title}</h5>
                    <h5>${item.price}</h5>
                    <button className="home-btn" onClick={() => addToCart(item)} >{t("AddToCart")}</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;