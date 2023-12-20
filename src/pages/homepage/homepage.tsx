import React, { useContext, useEffect, useState } from "react";
import "./homepage.scss";
import axios from "axios";
import { EventsMap } from "./map";
import { Filter } from "./filter";
import { Event } from "./event";
import { Events } from "../../types";
import { EventContext } from "../../context/event-context";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export enum EventTypeEnum {
  All = "all",
  DJs = "djs",
  LiveMusic = "live-music",
}

export enum DateEnum {
  WholePeriod = "whole-period",
  Today = "today",
  Tomorrow = "tomorrow",
  ThisWeek = "this-week",
  ThisWeekend = "this-weekend",
}

export const Homepage = () => {
  const [displayedEvents, setDisplayedEvents] = useState<Events[]>([]);
  const [eventTypeFilter, setEventTypeFilter] = useState<EventTypeEnum>(
    EventTypeEnum.All
  );
  const [dateFilter, setDateFilter] = useState<DateEnum>(DateEnum.WholePeriod);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);

  interface HomepageContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const { loading, setLoading } = useContext(
    EventContext
  ) as unknown as HomepageContextType;

  useEffect(() => {
    // Debounce the search input
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 800);

    // Cleanup the timeout on every change
    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  useEffect(() => {
    fetchEvents();
  }, [eventTypeFilter, dateFilter, debouncedSearchInput, currentPage]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = "https://pragueevents.pythonanywhere.com/api/v1/events/all/";
      // let url = "http://127.0.0.1:8000/api/v1/events/all/";
      // let url = "https://mock-api-ti6s.vercel.app/all";

      if (eventTypeFilter === EventTypeEnum.DJs) {
        url = "https://pragueevents.pythonanywhere.com/api/v1/events/djs/";
        // url = "http://127.0.0.1:8000/api/v1/events/djs/";
        // url = "https://mock-api-ti6s.vercel.app/djs";
      } else if (eventTypeFilter === EventTypeEnum.LiveMusic) {
        url =
          "https://pragueevents.pythonanywhere.com/api/v1/events/live-music/";
        // url = "http://127.0.0.1:8000/api/v1/events/live-music/";
        // url = "https://mock-api-ti6s.vercel.app/live-music";
      }

      const response = await axios.get(url);
      let filteredEvents: Events[] = response.data;

      // if (dateFilter === "today") {
      //   const today = new Date().toISOString().split("T")[0];
      //   filteredEvents = filteredEvents.filter((event) => event.date === today);
      // } else if (dateFilter === "tomorrow") {
      //   const tomorrow = new Date();
      //   tomorrow.setDate(tomorrow.getDate() + 1);
      //   const tomorrowISOString = tomorrow.toISOString().split("T")[0];
      //   filteredEvents = filteredEvents.filter(
      //     (event) => event.date === tomorrowISOString
      //   );
      // } else if (dateFilter === "this-week") {
      //   const today = new Date();
      //   const nextWeek = new Date(today);
      //   nextWeek.setDate(today.getDate() + 7);
      //   const nextWeekISOString = nextWeek.toISOString().split("T")[0];
      //   filteredEvents = filteredEvents.filter(
      //     (event) =>
      //       event.date >= today.toISOString().split("T")[0] &&
      //       event.date <= nextWeekISOString
      //   );
      // } else if (dateFilter === "this-weekend") {
      //   const today = new Date();
      //   const saturday = new Date(today);
      //   saturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7) + 1);
      //   const sunday = new Date(today);
      //   sunday.setDate(today.getDate() + ((7 - today.getDay() + 7) % 7));
      //   const saturdayISOString = saturday.toISOString().split("T")[0];
      //   const sundayISOString = sunday.toISOString().split("T")[0];
      //   filteredEvents = filteredEvents.filter(
      //     (event) =>
      //       event.date >= saturdayISOString && event.date <= sundayISOString
      //   );
      // }

      function getStartAndEndDates(dateFilter: string) {
        const today = new Date();
        const startDate = new Date(today);
        const endDate = new Date(today);

        if (dateFilter === DateEnum.Today) {
          startDate.setDate(today.getDate());
          endDate.setDate(today.getDate());
        } else if (dateFilter === DateEnum.Tomorrow) {
          startDate.setDate(today.getDate() + 1);
          endDate.setDate(today.getDate() + 1);
        } else if (dateFilter === DateEnum.ThisWeek) {
          const difference = today.getDay() === 0 ? -6 : 1 - today.getDay();
          startDate.setDate(today.getDate() + difference);
          endDate.setDate(startDate.getDate() + 6);
          startDate.setDate(today.getDate());
        } else if (dateFilter === DateEnum.ThisWeekend) {
          startDate.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7));
          endDate.setDate(startDate.getDate() + 1);
          // startDate.setDate(today.getDate());
        }

        console.log("startDate: " + startDate.toISOString().split("T")[0]);
        console.log("endDate: " + endDate.toISOString().split("T")[0]);

        return {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        };
      }

      const { startDate, endDate } = getStartAndEndDates(dateFilter);

      dateFilter !== DateEnum.WholePeriod &&
        (filteredEvents = filteredEvents.filter(
          (event) => event.date >= startDate && event.date <= endDate
        ));

      if (searchInput.trim() !== "") {
        const lowerCaseSearchInput = searchInput.toLowerCase();
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.name.toLowerCase().includes(lowerCaseSearchInput) ||
            event.event_type.toLowerCase().includes(lowerCaseSearchInput) ||
            event.venue.toLowerCase().includes(lowerCaseSearchInput)
        );
      }

      setDisplayedEvents(filteredEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventTypeFilterChange = (filterOption: EventTypeEnum) => {
    setSelectedEvent(null);
    setEventTypeFilter(filterOption);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (filterOption: DateEnum) => {
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
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* {displayedEvents} */}

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
        <span className="pme-events__loading"></span>
      ) : (
        <div className="pme-events">
          {displayedEvents.length > 0 ? (
            <div className="pme-events__cards">
              <Container>
                <Row>
                  {currentEvents.map((event) => (
                    <Event data={event} key={event.id} />
                  ))}
                </Row>
              </Container>
            </div>
          ) : (
            <div className="pme-events__no-events">
              xxx sorry there are no events at this time
            </div>
          )}

          {displayedEvents.length > 15 && (
            <div className="pme-page-buttons">
              <button
                className="pme-page-buttons__previous"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                PREVIOUS
              </button>
              <button
                className="pme-page-buttons__next"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                NEXT
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
