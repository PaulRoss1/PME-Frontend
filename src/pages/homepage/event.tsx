import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

interface EventProps {
  data: {
    id: number;
    name: string;
    event_type: string;
    date: string;
  };
}

export const Event = (props: EventProps) => {
  const { id, name, event_type, date } = props.data;
  return (
    <div>
      <li>
        <Link to={`/event/${id}`}>{name}</Link>
        <br />
        <strong>Event Type:</strong> {event_type}
        <br />
        <strong>Date:</strong> {date}
        <br />
        <hr />
      </li>
    </div>
  );
};
