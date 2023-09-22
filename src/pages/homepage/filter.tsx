import React from "react";
import "./homepage.css";

interface FilterProps {
  data: {
    eventTypeFilter: string;
    handleEventTypeFilterChange: (eventType: string) => void;
    dateFilter: string;
    handleDateFilterChange: (date: string) => void;
    searchInput: string;
    handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export const Filter = ({ data }: FilterProps) => {
  const {
    eventTypeFilter,
    handleEventTypeFilterChange,
    dateFilter,
    handleDateFilterChange,
    searchInput,
    handleSearchInputChange,
  } = data;
  return (
    <>
      <div className="event-filter">
        <div className="left">
          <button
            onClick={() => handleEventTypeFilterChange("all")}
            className={`filter__text ${
              eventTypeFilter === "all" ? "active" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleEventTypeFilterChange("djs")}
            className={`filter__text ${
              eventTypeFilter === "djs" ? "active" : ""
            }`}
          >
            DJ's
          </button>
          <button
            onClick={() => handleEventTypeFilterChange("live-music")}
            className={`filter__text ${
              eventTypeFilter === "live-music" ? "active" : ""
            }`}
          >
            Live Music
          </button>
          <div className="filter__select">
            <select
              className="filter__select-text"
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
        </div>
        <div className="filter__search">
          <input
            type="text"
            placeholder="Search.."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
    </>
  );
};
