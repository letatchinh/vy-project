import React from 'react';
import "./CartItemCard.css";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CartItemCard = ({ item }) => {
    const {user} = useSelector(state => state.user)
    const dispatch  = useDispatch()
    console.log(user);
    const increaseQuantity = async() => {
        const newListCart = user.listCarts.map(e => {
            if(e.product === item.product){
                return {...e,quantity : ++e.quantity}
            }
            else{
                return e
            }
        })
        const newUser = {...user,listCarts : newListCart}
        await axios.put("/api/v1/addToCart",newUser).then(res => {
            dispatch({type : "ADD_TO_CART_USER",payload : res.data.user})
          })
    }
    const decreaseQuantity = async() => {
        const newListCart = user.listCarts.map(e => {
            if(e.product === item.product){
                return {...e,quantity : --e.quantity}
            }
            else{
                return e
            }
        })
        const newUser = {...user,listCarts : newListCart}
        await axios.put("/api/v1/addToCart",newUser).then(res => {
            dispatch({type : "ADD_TO_CART_USER",payload : res.data.user})
          })
    }
    const deleteCartItems = async() => {
        const newListCart = user.listCarts.filter(e => e.product !== item.product)
        const newUser = {...user,listCarts : newListCart}
        await axios.put("/api/v1/addToCart",newUser).then(res => {
            dispatch({type : "ADD_TO_CART_USER",payload : res.data.user})
          })
    }
    return (
        <>

        <div className="CartItemCard">
            <img src={item.image} alt="Item Images" />
            <div>
                <Link to={`/product/${item.product}`}> {item.name} </Link> 
                <span>{`Price $${item.price}`}</span> 
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
        <div className="cartInput">
                                        <button onClick={decreaseQuantity}>
                                            -
                                        </button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <p className="cartSubtotal">
                                        {`$${
                                            item.price * item.quantity
                                        }`}
                                    </p>
        </>

    );
}

export default CartItemCard;