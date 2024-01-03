import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDate } from "../../helpers/helperFunctions";

interface EventProps {
  data: {
    id: number;
    name: string;
    event_type: string;
    date: string;
    image: string;
    venue: string;
    slug: string;
  };
}

export const Event = (props: EventProps) => {
  const { id, name, event_type, date, image, venue, slug } = props.data;
  const eventLink = `/event/${slug}/${id}`;

  return (
    <Col md={4} xs={12} className="pme-events__col">
      <div className="pme-events__card">
        <Link to={eventLink}>
          <img className="pme-events__card-image" src={image} alt="event" />
        </Link>
        <div className="pme-events__card-content">
          <Link className="pme-events__card-title" to={eventLink}>
            {name}
          </Link>
          <div className="pme-events__card-info">
            <span>{`${event_type}, ${formatDate(date)}`}</span>
            <span>{venue}</span>
          </div>
          <Link to={eventLink}>
            <button className="pme-events__card-button">VIEW DETAILS</button>
          </Link>
        </div>
      </div>
    </Col>
  );
};
