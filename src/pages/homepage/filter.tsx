import React from "react";
// import "./homepage.scss";

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
      <div className="pme-filter">
        <div className="pme-filter__buttons">
          <button
            onClick={() => handleEventTypeFilterChange("all")}
            className={`pme-filter__button ${
              eventTypeFilter === "all" ? "pme-filter__button-active" : ""
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => handleEventTypeFilterChange("djs")}
            className={`pme-filter__button ${
              eventTypeFilter === "djs" ? "pme-filter__button-active" : ""
            }`}
          >
            DJ<span>'</span>s
          </button>
          <button
            onClick={() => handleEventTypeFilterChange("live-music")}
            className={`pme-filter__button ${
              eventTypeFilter === "live-music"
                ? "pme-filter__button-active"
                : ""
            }`}
          >
            LIVE MUSIC
          </button>
          <div className="pme-filter__dropdown">
            <select
              className="pme-filter__dropdown-text"
              value={dateFilter}
              onChange={(e) => handleDateFilterChange(e.target.value)}
            >
              <option value="whole-period">WHOLE PERIOD</option>
              <option value="today">TODAY</option>
              <option value="tomorrow">TOMORROW</option>
              <option value="this-week">THIS WEEK</option>
              <option value="this-weekend">THIS WEEKEND</option>
            </select>
          </div>
        </div>
        <div className="pme-filter__input">
          <input
            type="text"
            placeholder="SEARCH"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
    </>
  );
};
