import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";
import { Link } from "react-router-dom";

export const CartItem = (props) => {
  const { id, name, image, price } = props.data;
  const { addToCart, removeFromCart, cartItems, updateCartItemCount } =
    useContext(EventContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), id);
  };

  return (
    <div className="cartItem">
      <img src={image} alt="" />
      <div className="description">
        <Link to={`/event/${id}`}>
          {name} ({id})
        </Link>
        <p>price: {price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={handleInputChange} />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
};
