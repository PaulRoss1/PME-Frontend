import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { Loading } from "../../elements/loading";

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

  document.title = "Prague Music Events";

  interface HomepageContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const { loading, setLoading } = useContext(
    EventContext
  ) as unknown as HomepageContextType;

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 800);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  useEffect(() => {
    fetchEvents();
  }, [eventTypeFilter, dateFilter, debouncedSearchInput, currentPage]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = "https://pragueevents.pythonanywhere.com/api/v1/events/all/";

      if (eventTypeFilter === EventTypeEnum.DJs) {
        url = "https://pragueevents.pythonanywhere.com/api/v1/events/djs/";
      } else if (eventTypeFilter === EventTypeEnum.LiveMusic) {
        url =
          "https://pragueevents.pythonanywhere.com/api/v1/events/live-music/";
      }

      const response = await axios.get(url);
      let filteredEvents: Events[] = response.data;

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
        }

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

  const resetFilters = () => {
    setSelectedEvent(null);
    setCurrentPage(1);
  };

  const handleEventTypeFilterChange = (filterOption: EventTypeEnum) => {
    resetFilters();
    setEventTypeFilter(filterOption);
  };

  const handleDateFilterChange = (filterOption: DateEnum) => {
    resetFilters();
    setDateFilter(filterOption);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    resetFilters();
  };

  const eventsPerPage = 15;

  const totalPages = useMemo(
    () => Math.ceil(displayedEvents.length / eventsPerPage),
    [displayedEvents]
  );
  const indexOfLastEvent = useMemo(
    () => currentPage * eventsPerPage,
    [currentPage]
  );
  const indexOfFirstEvent = useMemo(
    () => indexOfLastEvent - eventsPerPage,
    [indexOfLastEvent]
  );
  const currentEvents = useMemo(
    () => displayedEvents.slice(indexOfFirstEvent, indexOfLastEvent),
    [displayedEvents, indexOfFirstEvent, indexOfLastEvent]
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
        <Loading />
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
              Sorry, there are no events on this day.{" "}
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
