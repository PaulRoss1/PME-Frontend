import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { EventContext } from "../../context/event-context";
import { useParams, useNavigate } from "react-router-dom";
import { CartItem } from "./cart-item";

export const Cart = () => {
  const { id } = useParams();
  const { addToCart, events, cartItems, getTotalCarAmount } =
    useContext(EventContext);
  const [loading, setLoading] = useState(true);
  const event = events.find((event) => event.id === parseInt(id));
  const cartItemsAmount = cartItems[id];
  const totalAmount = getTotalCarAmount();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [event]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {id && (
        <div>
          {event?.name}
          <br />
          <button onClick={() => addToCart(id)}>
            add to cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}
          </button>
          <br />
          {id}
        </div>
      )}
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
