import React, { Fragment, useContext } from "react";
import "./event_page.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EventContext } from "../../context/event-context";
import { Events } from "../../types";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Event } from "../../pages/homepage/event";

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
    <div className="event-page">
      <button onClick={() => navigate("/")}>Back</button>

      <div className="event-info">
        <div className="img">
          <img src={currentEvent?.image}></img>
        </div>
        <br />
        <h2>{currentEvent?.name}</h2>
        <br />
        {currentEvent?.event_type}
        <br />
        Date: {currentEvent?.date}
        <br />
        Venue: {currentEvent?.venue}
        <br />
        Address: {currentEvent?.address}
        <br />
        Price: {currentEvent?.price}
        <br />
        <div className="countHandler">
          <button onClick={() => cartItems[id] > 0 && removeFromCart(id)}>
            -
          </button>
          <input value={cartItems[id]} onChange={handleInputChange} />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
        <button
          onClick={() => navigate("/cart")}
          disabled={cartItems[id] === 0}
        >
          Buy tickets
        </button>
      </div>
      <div className="more-events">
        <br />
        {sameDayEvents.length > 0 && <h2>more events on this day</h2>}

        <Container>
          <Row>
            {sameDayEvents.map((event) => (
              <Event data={event} key={event.id} />
            ))}
          </Row>
        </Container>

        {/* {sameDayEvents.length > 0 &&
          sameDayEvents.map((event) => (
            <Fragment key={event.id}>
              <Link to={`/event/${event.id}`}>{event.name}</Link>
              <br />
            </Fragment>
          ))} */}
      </div>
    </div>
  );
};
