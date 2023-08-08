import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";

export const CartItem = (props) => {
  const { id, name, image, price } = props.data;
  const { addToCart, removeFromCart, cartItems, updateCartItemCount } =
    useContext(EventContext);

  return (
    <div className="cartItem">
      <img src={image} alt="" />
      <div className="description">
        <p>{name}</p>
        <p>price: {price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
};
