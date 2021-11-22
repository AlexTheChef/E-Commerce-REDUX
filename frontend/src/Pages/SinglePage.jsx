import React from 'react';
import { useParams } from 'react-router'
import '../App.css';
import Error from './Error'
import Navbar from '../Components/Navbar';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../Store/index'
import data from '../Data/Data';

function SinglePage(props) {

    const { productData } = data;

    //Redux
    const dispatch = useDispatch()
    const { addToCart } = bindActionCreators(actionCreators, dispatch)
    //Redux

    const { id } = useParams();
    return (
        <div className="home-container">
            <Navbar />
            {(id <= productData.length && id > 0) ? <div className="">
                <img className='info-img' src={`${productData[id - 1].img}`} alt='/#' />
                <div className="total-price">
                    <div>  Name:  {productData[id - 1].title} </div>
                    <div>  Price:  ${productData[id - 1].price} </div>
                </div>
                <button className="home-btn" onClick={() => addToCart(productData[id - 1])} >Add to Cart</button>
            </div>
                :
                <Error />}
        </div>
    );
}

export default SinglePage;