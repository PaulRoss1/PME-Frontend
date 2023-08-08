import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

export const Event = (props) => {
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
