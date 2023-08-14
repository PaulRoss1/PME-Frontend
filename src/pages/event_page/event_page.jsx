import React, { useContext, useEffect, useState } from "react";
import "./event_page.css";
import { useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../../context/event-context";

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    events,
    removeFromCart,
    cartItems,
    updateCartItemCount,
    addToCart,
    loading,
    setLoading,
  } = useContext(EventContext);

  const selectedEvent = events.find((event) => event.id === parseInt(id));

  const sameDayEvents = events.filter(
    (event) => event.date === selectedEvent.date
  );

  if (loading) {
    setLoading(false);
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), id);
  };

  return (
    <div>
      {selectedEvent?.name}
      <br />
      price: {selectedEvent?.price}
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
      <button onClick={() => navigate("/cart")} disabled={cartItems[id] === 0}>
        Buy tickets
      </button>
      {/* <div>
        <h1>more events on this day</h1>

        {sameDayEvents.map((event) => {
          return <p>{event.name}</p>;
        })}
      </div> */}
      <div>
        <h1>more events on this day</h1>

        {sameDayEvents.length > 0 ? (
          sameDayEvents.map((event) => (
            <p key={event.id}>
              {event.name} - {event.date}
            </p>
          ))
        ) : (
          <p>No other events on this day</p>
        )}
      </div>
    </div>
  );
};
