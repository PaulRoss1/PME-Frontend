import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import { EventsMap } from "./map";
import { Filter } from "./filter";
import { Event } from "./event";
import { Events } from "../../types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export const Homepage = () => {
  const [displayedEvents, setDisplayedEvents] = useState<Events[]>([]);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("whole-period");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [eventTypeFilter, dateFilter, searchInput, currentPage]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // let url = "http://127.0.0.1:8000/api/v1/events/all/";
      let url = "https://mock-api-ti6s.vercel.app/all";

      if (eventTypeFilter === "djs") {
        // url = "http://127.0.0.1:8000/api/v1/events/djs/";
        url = "https://mock-api-ti6s.vercel.app/djs";
      } else if (eventTypeFilter === "live-music") {
        // url = "http://127.0.0.1:8000/api/v1/events/live-music/";
        url = "https://mock-api-ti6s.vercel.app/live-music";
      }

      const response = await axios.get(url);
      let filteredEvents: Events[] = response.data;

      if (dateFilter === "today") {
        const today = new Date().toISOString().split("T")[0];
        filteredEvents = filteredEvents.filter((event) => event.date === today);
      } else if (dateFilter === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowISOString = tomorrow.toISOString().split("T")[0];
        filteredEvents = filteredEvents.filter(
          (event) => event.date === tomorrowISOString
        );
      } else if (dateFilter === "this-week") {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        const nextWeekISOString = nextWeek.toISOString().split("T")[0];
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.date >= today.toISOString().split("T")[0] &&
            event.date <= nextWeekISOString
        );
      } else if (dateFilter === "this-weekend") {
        const today = new Date();
        const saturday = new Date(today);
        saturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7) + 1);
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + ((7 - today.getDay() + 7) % 7));
        const saturdayISOString = saturday.toISOString().split("T")[0];
        const sundayISOString = sunday.toISOString().split("T")[0];
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.date >= saturdayISOString && event.date <= sundayISOString
        );
      }

      if (searchInput.trim() !== "") {
        const lowerCaseSearchInput = searchInput.toLowerCase();
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.name.toLowerCase().includes(lowerCaseSearchInput) ||
            event.event_type.toLowerCase().includes(lowerCaseSearchInput)
        );
      }

      setDisplayedEvents(filteredEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventTypeFilterChange = (filterOption: string) => {
    setSelectedEvent(null);
    setEventTypeFilter(filterOption);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (filterOption: string) => {
    setSelectedEvent(null);
    setDateFilter(filterOption);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
    setSelectedEvent(null);
  };

  const eventsPerPage = 15;
  const totalPages = Math.ceil(displayedEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = displayedEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <EventsMap
        data={displayedEvents}
        info={{ selectedEvent, setSelectedEvent }}
      />
      <Filter
        data={{
          eventTypeFilter,
          handleEventTypeFilterChange,
          dateFilter,
          handleDateFilterChange,
          searchInput,
          handleSearchInputChange,
        }}
      />
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div className="events-section">
          <div className="events-cards">
            <Container>
              <Row>
                {currentEvents.map((event) => (
                  <Event data={event} key={event.id} />
                ))}
              </Row>
            </Container>
          </div>
          <div className="prev_next">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
