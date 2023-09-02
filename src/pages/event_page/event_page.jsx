import React, { Fragment, useContext } from "react";
import "./event_page.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EventContext } from "../../context/event-context";

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events, removeFromCart, cartItems, updateCartItemCount, addToCart } =
    useContext(EventContext);

  const currentEvent = events.find((event) => event.id === parseInt(id));

  const sameDayEvents = events
    .filter((event) => event.date === currentEvent.date)
    .filter((event) => event.id !== currentEvent.id);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), id);
  };

  return (
    <div>
      <img src={currentEvent?.image}></img>
      <br />
      {currentEvent?.name}
      <br />
      {currentEvent?.date}
      <br />
      {currentEvent?.event_type}
      <br />
      venue: {currentEvent?.venue}
      <br />
      address: {currentEvent?.address}
      <br />
      price: {currentEvent?.price}
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
            <Fragment key={event.id}>
              <Link to={`/event/${event.id}`}>{event.name}</Link>
              <br />
            </Fragment>
          ))}
      </div>
    </div>
  );
};
