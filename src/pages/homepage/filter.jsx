import React from "react";
import "./homepage.css";

export const Filter = ({ data }) => {
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
      <div>
        <button
          onClick={() => handleEventTypeFilterChange("all")}
          className={eventTypeFilter === "all" ? "active" : ""}
        >
          All Events
        </button>
        <button
          onClick={() => handleEventTypeFilterChange("djs")}
          className={eventTypeFilter === "djs" ? "active" : ""}
        >
          DJ's
        </button>
        <button
          onClick={() => handleEventTypeFilterChange("live-music")}
          className={eventTypeFilter === "live-music" ? "active" : ""}
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
    </>
  );
};
