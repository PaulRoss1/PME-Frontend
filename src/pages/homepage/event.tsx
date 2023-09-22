import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

interface EventProps {
  data: {
    id: number;
    name: string;
    event_type: string;
    date: string;
    image: string;
    venue: string;
  };
}

export const Event = (props: EventProps) => {
  const { id, name, event_type, date, image, venue } = props.data;
  return (
    <Col md={4} xs={12}>
      <div className="single_event">
        <div className="event_card">
          <img src={image} alt="event" />
          <br />
          <Link className="single_event-header" to={`/event/${id}`}>
            {name}
          </Link>
          <br />
          {`${event_type}, ${date}`}
          <br />
          {venue}
          <br />
          <button>View Details</button>
        </div>
      </div>
    </Col>
  );
};
