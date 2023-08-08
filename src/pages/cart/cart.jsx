import React, { useContext } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./cart-item";

export const Cart = () => {
  const { events, cartItems, getTotalCartAmount } = useContext(EventContext);

  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <>
      {totalAmount > 0 ? (
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
            <button onClick={() => navigate("/")}>
              Continue Browsing (keep?)
            </button>
            <button>checkout</button>
          </div>
        </>
      ) : (
        <h1>your cart is empty</h1>
      )}
    </>
  );
};
