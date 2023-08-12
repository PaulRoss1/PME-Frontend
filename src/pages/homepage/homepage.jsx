import React from "react";
import { useState, useEffect } from "react";
import "./homepage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Event } from "./event";
import { Map } from "./map";

export const Homepage = () => {
  const [events, setEvents] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("whole-period");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [eventTypeFilter, dateFilter, searchInput, currentPage]);

  const fetchEvents = async () => {
    try {
      let url = "http://127.0.0.1:8000/api/v1/events/all/";

      if (eventTypeFilter === "djs") {
        url = "http://127.0.0.1:8000/api/v1/events/djs/";
      } else if (eventTypeFilter === "live-music") {
        url = "http://127.0.0.1:8000/api/v1/events/live-music/";
      }

      const response = await axios.get(url);
      let filteredEvents = response.data;

      if (dateFilter === "today") {
        const today = new Date().toISOString().split("T")[0];
        filteredEvents = filteredEvents.filter((event) => event.date === today);
      } else if (dateFilter === "tomorrow") {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
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

      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventTypeFilterChange = (filterOption) => {
    setSelectedEvent(null);
    setActiveFilter(filterOption);
    setEventTypeFilter(filterOption);
    setCurrentPage(1); // Reset to the first page when changing the event type filter
  };

  const handleDateFilterChange = (filterOption) => {
    setDateFilter(filterOption);
    setCurrentPage(1); // Reset to the first page when changing the date filter
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing the search input
  };

  const eventsPerPage = 5;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h1>Events</h1>
      <Map data={events} info={{ selectedEvent, setSelectedEvent }} />
      <div>
        <button
          onClick={() => handleEventTypeFilterChange("all")}
          className={activeFilter === "all" ? "active" : ""}
        >
          All Events
        </button>
        <button
          onClick={() => handleEventTypeFilterChange("djs")}
          className={activeFilter === "djs" ? "active" : ""}
        >
          DJ's
        </button>
        <button
          onClick={() => handleEventTypeFilterChange("live-music")}
          className={activeFilter === "live-music" ? "active" : ""}
        >
          Live Music
        </button>
      </div>
      <div>
        <select
          value={dateFilter}
          onChange={(e) => handleDateFilterChange(e.target.value)}
        >
          <option value="whole-period">Whole Period</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="this-week">This Week</option>
          <option value="this-weekend">This Weekend</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search events"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <ul>
        {currentEvents.map((event) => (
          <Event data={event} key={event.id} />
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
