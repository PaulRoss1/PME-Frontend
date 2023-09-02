import React, { useContext, useEffect } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./cart-item";

let totalAmount;

export const Cart = () => {
  const { events, cartItems, getTotalCartAmount } = useContext(EventContext);

  useEffect(() => {
    totalAmount = events.length > 0 ? getTotalCartAmount() : 0;
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
