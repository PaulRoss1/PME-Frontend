import React from "react";
// import "./homepage.scss";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo } from "react";
import { Events } from "../../types";

interface MapProps {
  data: Events[];
  info: {
    selectedEvent: Events | null;
    setSelectedEvent: React.Dispatch<React.SetStateAction<Events | null>>;
  };
}

export const EventsMap = ({ data, info }: MapProps) => {
  const { selectedEvent, setSelectedEvent } = info;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAboZdZ_AdxzOhLELaETrg5r1wy9lYo--8",
  });

  const center = useMemo(() => ({ lat: 50.0755, lng: 14.4378 }), []);

  const mapOptions = {
    scrollwheel: false,
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    styles: [
      {
        stylers: [{ saturation: -100 }],
      },
    ],
  };

  if (isLoaded) {
    return (
      <div className="pme-map">
        <GoogleMap
          zoom={13}
          center={center}
          options={mapOptions}
          mapContainerClassName="pme-map__container"
        >
          {data.map((event) => (
            <Marker
              key={event.id}
              position={{
                lat: parseFloat(event.lat_long.split(" ")[0]),
                lng: parseFloat(event.lat_long.split(" ")[1]),
              }}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
          {selectedEvent && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedEvent.lat_long.split(" ")[0]),
                lng: parseFloat(selectedEvent.lat_long.split(" ")[1]),
              }}
              onCloseClick={() => setSelectedEvent(null)}
            >
              <>
                <span className="pme-map__info-venue">
                  {selectedEvent.venue}
                  <hr />
                </span>
                <div className="pme-map__info-window">
                  {data
                    .filter(
                      (event) => event.lat_long === selectedEvent.lat_long
                    )
                    .map((event) => (
                      <>
                        <Link
                          key={event.id}
                          className="pme-map__info-details"
                          to={`/event/${event.id}`}
                        >
                          {`${event.date.split("-")[2]}.${
                            event.date.split("-")[1]
                          }. ${event.name}`}
                        </Link>
                        <br />
                      </>
                    ))}
                </div>
              </>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  } else {
    return <></>;
  }
};
