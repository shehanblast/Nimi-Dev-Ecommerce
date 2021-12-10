import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Components
import CartItem from "../Cart/CartItem";
import CartPayment from "../../Views/Cart/cartPayment";

//Actions
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";

//Common
import Footer from "../../Common/footer/footer";
import Header from "../../Common/Header/header";
import CartHeader from "../Cart/cartHeader";

//Css
import "./CartScreen.css";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const navigatePayment = (e,id) => {
    window.location = `/cartpayment/${id}`
  }


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  let tot = getCartSubTotal();

  console.log("Total is : "+ tot);

  return (
      <>
        <Header/>
      <div className="container">
        <br/>
        <CartHeader/>

        <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>
          <hr/>

            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty <Link to="/">Go Back</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeFromCartHandler}
                />
              ))
            )}

        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <hr/>
            <p>Total Count :- {getCartCount()} Items </p>
            <p>Total Price :- LKR:{getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={e => navigatePayment(e,tot)}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
      </div>

<Footer/>
      </>

  );
};

export default CartScreen;
