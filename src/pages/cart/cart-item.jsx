import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";

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
        <p>{name}</p>
        <p>price: {price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={handleInputChange} />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
};
