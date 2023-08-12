import React, { Fragment } from "react";
import { useState } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { useMemo } from "react";

export const Map = ({ data, info }) => {
  const { selectedEvent, setSelectedEvent } = info;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAboZdZ_AdxzOhLELaETrg5r1wy9lYo--8",
  });

  const center = useMemo(() => ({ lat: 50.0755, lng: 14.4378 }), []);

  const mapOptions = {
    scrollwheel: false,
    // zoom: 13,
    disableDefaultUI: true,
    zoomControl: true,
    clickableIcons: false,
    styles: [
      {
        stylers: [{ saturation: -100 }],
      },
    ],
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <GoogleMap
          zoom={13}
          center={center}
          options={mapOptions}
          mapContainerClassName="map-container"
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
                <div className="info-window">
                  {data
                    .filter(
                      (event) => event.lat_long === selectedEvent.lat_long
                    )
                    .map((event) => (
                      <>
                        <Link
                          key={event.id}
                          className="info-details"
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
      </>
    );
  }
};
