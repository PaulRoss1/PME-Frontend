import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";
import { Link } from "react-router-dom";

interface CartItemProps {
  data: {
    id: number;
    name: string;
    image: string;
    price: number;
    venue: string;
    date: string;
  };
}

export const CartItem = (props: CartItemProps) => {
  const { id, name, image, price, venue, date } = props.data;

  interface CartItemContextType {
    cartItems: Record<number, number>;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    updateCartItemCount: (newAmount: number, id: number) => void;
  }

  const { addToCart, removeFromCart, cartItems, updateCartItemCount } =
    useContext(EventContext) as CartItemContextType;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), id);
  };

  return (
    <div className="cartItem">
      <img src={image} alt="" />
      <div className="description">
        <Link to={`/event/${id}`}>{name}</Link>
        <p>
          {venue}, {date}
        </p>
        <p>Price: {price}</p>
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
