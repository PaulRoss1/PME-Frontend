import React, { useContext, useEffect, useState } from "react";
import "./event_page.css";
import { useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../../context/event-context";

export const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { events } = useContext(EventContext);
  const [loading, setLoading] = useState(true);
  const event = events.find((event) => event.id === parseInt(id));

  useEffect(() => {
    setLoading(false);
  }, [event]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {event?.name}
      <br />
      id: {id}
      <br />
      <button onClick={() => navigate(`/cart/${id}`)}>Buy tickets</button>
    </div>
  );
};
