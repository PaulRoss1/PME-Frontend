import React, { useContext, useEffect, useState } from "react";
import "./event_page.css";
import { useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../../context/event-context";

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, removeFromCart, cartItems, updateCartItemCount, addToCart } =
    useContext(EventContext);
  const [loading, setLoading] = useState(true);
  const event = events.find((event) => event.id === parseInt(id));

  useEffect(() => {
    setLoading(false);
  }, [event]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), id);
  };

  return (
    <div>
      {event?.name}
      <br />
      price: {event?.price}
      <br />
      id: {id}
      <br />
      <div className="countHandler">
        <button onClick={() => cartItems[id] > 0 && removeFromCart(id)}>
          -
        </button>
        <input value={cartItems[id]} onChange={handleInputChange} />
        <button onClick={() => addToCart(id)}>+</button>
      </div>
      <button onClick={() => navigate("/cart")}>Buy tickets</button>
    </div>
  );
};
