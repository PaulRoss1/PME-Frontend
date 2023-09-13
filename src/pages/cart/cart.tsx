import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./cart-item";
import { Events } from "../../types";

export const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  interface CartContextType {
    events: Events[];
    cartItems: Record<number, number>;
  }

  const { events, cartItems } = useContext(EventContext) as CartContextType;

  useEffect(() => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = events.find((event) => event.id === Number(item));
        itemInfo && (total += cartItems[item] * itemInfo.price);
      }
    }
    setTotalAmount(total);
  }, [events, cartItems]);

  const navigate = useNavigate();

  return (
    <>
      {1 < 0 ? (
        <h1>your cart is empty</h1>
      ) : (
        <>
          <div className="cart">
            <div>
              <h1>Cart Items</h1>
            </div>
            <div className="cartItems">
              {events.map((event) => {
                if (cartItems[event.id] !== 0) {
                  return <CartItem data={event} key={event.id} />;
                }
              })}
            </div>
          </div>

          <div className="checkout">
            <p>Subtotal: ${totalAmount}</p>
            <button onClick={() => navigate("/")}>Continue Browsing</button>
            <button>checkout</button>
          </div>

          <br />
        </>
      )}
    </>
  );
};
