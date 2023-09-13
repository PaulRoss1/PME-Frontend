import React, { Fragment, useContext } from "react";
import "./event_page.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EventContext } from "../../context/event-context";
import { Events } from "../../types";

export const EventPage = () => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();

  interface EventPageContextType {
    events: Events[];
    removeFromCart: (id: number) => void;
    cartItems: Record<number, number>;
    updateCartItemCount: (newAmount: number, id: number) => void;
    addToCart: (id: number) => void;
  }

  const { events, removeFromCart, cartItems, updateCartItemCount, addToCart } =
    useContext(EventContext) as EventPageContextType;

  const currentEvent = events.find(
    (event: { id: number }) => event.id === parseInt(id as string)
  );

  const sameDayEvents: Events[] = events
    .filter((event: { date: string }) => event.date === currentEvent?.date)
    .filter((event: { id: number }) => event.id !== currentEvent?.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), Number(id));
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
      id:: {id}
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
