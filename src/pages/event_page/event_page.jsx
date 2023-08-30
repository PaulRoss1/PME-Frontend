import React, { useContext, useEffect, useState } from "react";
import "./event_page.css";
import { useParams, useNavigate, Link } from "react-router-dom";
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

  const sameDayEvents = events
    .filter((event) => event.date === selectedEvent.date)
    .filter((event) => event.id !== selectedEvent.id);

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
      <img src={selectedEvent?.image}></img>
      <br />
      {selectedEvent?.name}
      <br />
      {selectedEvent?.date}
      <br />
      {selectedEvent?.event_type}
      <br />
      venue: {selectedEvent?.venue}
      <br />
      address: {selectedEvent?.address}
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
      <div>
        <br />
        {sameDayEvents.length > 0 && <h2>more events on this day</h2>}

        {sameDayEvents.length > 0 &&
          sameDayEvents.map((event) => (
            <>
              <Link to={`/event/${event.id}`}>{event.name}</Link>
              <br />
            </>
          ))}
      </div>
    </div>
  );
};
