import React, { Fragment, useContext } from "react";
import "./event_page.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { EventContext } from "../../context/event-context";
import { Events } from "../../types";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Event } from "../../pages/homepage/event";
import { formatDate } from "../../helpers/helperFunctions";
import { NotFound } from "../not_found/not_found";

export const EventPage = () => {
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();

  interface EventPageContextType {
    events: Events[];
    removeFromCart: (id: number) => void;
    cartItems: Record<number, number>;
    updateCartItemCount: (newAmount: number, id: number) => void;
    addToCart: (id: number) => void;
    loading: boolean;
  }

  const {
    events,
    removeFromCart,
    cartItems,
    updateCartItemCount,
    addToCart,
    loading,
  } = useContext(EventContext) as EventPageContextType;

  const currentEvent = events.find(
    (event: { id: number }) => event.id === parseInt(id as string)
  );

  currentEvent && (document.title = currentEvent.name);

  const sameDayEvents: Events[] = events
    .filter((event: { date: string }) => event.date === currentEvent?.date)
    .filter((event: { id: number }) => event.id !== currentEvent?.id);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), Number(id));
  };

  return events.length === 0 ? (
    <span className="pme-events__loading"></span>
  ) : currentEvent ? (
    <div className="pme-event-page">
      <div className="pme-event-page__image-section">
        <div
          className="pme-event-page__blured-background"
          style={{ backgroundImage: `url(${currentEvent?.image})` }}
        ></div>

        <img src={currentEvent?.image}></img>
      </div>
      <div className="pme-event-page__info-section">
        <div className="pme-event-page__container">
          {/* <button onClick={() => navigate("/")}>Back</button> */}

          <div className="pme-event-page__content">
            <h2 className="pme-event-page__title">{currentEvent?.name}</h2>
            <div className="pme-event-page__info">
              <span>Date: {formatDate(currentEvent?.date)}</span>

              <span>{currentEvent?.event_type}</span>

              <span>Venue: {currentEvent?.venue}</span>
            </div>
            <span className="pme-event-page__address">
              Address: {currentEvent?.address}
            </span>
            <span className="pme-event-page__price">
              Price: {currentEvent?.price} Kč
            </span>

            <div className="pme-event-page__tickets">
              <div className="pme-event-page__input">
                <button onClick={() => cartItems[id] > 0 && removeFromCart(id)}>
                  -
                </button>
                <input value={cartItems[id]} onChange={handleInputChange} />
                <button onClick={() => addToCart(id)}>+</button>
              </div>
              <button
                className="pme-event-page__buy"
                onClick={() => navigate("/cart")}
                disabled={cartItems[id] === 0}
              >
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      {sameDayEvents.length > 0 && (
        <div className="pme-event-page__more-container">
          <div className="pme-event-page__more">
            <h2>
              MORE <span className="pme-event-page__more-span">EVENTS</span> ON{" "}
              {formatDate(currentEvent?.date)}
            </h2>

            <Container>
              <Row>
                {sameDayEvents.map((event) => (
                  <Event data={event} key={event.id} />
                ))}
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  ) : (
    <NotFound />
  );
};
