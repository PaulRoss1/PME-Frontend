import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isLoading: false,
    events: [],
    markers: [],
    currentPage: 1,
    showNextButton: false,
    showPreviousButton: false,
    category: "all-events",
    timeFrame: "whole-period",
    displayTimeFrame: "Whole Period",
    isEmpty: false,
  },
  mutations: {
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setDisplayTimeFrame(state, status) {
      state.displayTimeFrame = status;
    },
    updateEvents(state, status) {
      state.events = status;
    },
    updateMarkers(state, status) {
      state.markers = status;
    },
    setIsEmpty(state, status) {
      state.isEmpty = status;
    },
    setCategory(state, status) {
      state.category = status;
    },
    setCurrentPage(state, status) {
      state.currentPage = status;
    },
    setTimeFrame(state, status) {
      state.timeFrame = status;
    },
    setShowNextButton(state, status) {
      state.showNextButton = status;
    },
    setShowPreviousButton(state, status) {
      state.showPreviousButton = status;
    },
  },
  actions: {
    async getTodayEvents({ commit, state }, payload) {
      commit("updateEvents", []);

      commit("setCurrentPage", 1);

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      commit("setIsLoading", true);

      await axios
        .get(
          `https://pme-backend.herokuapp.com/api/v1/today-events/${payload.today}`
        )
        .then((response) => {
          let todayEvents = [];

          for (let i = 0; i < response.data.length; i++) {
            if (
              response.data[i].date == payload.today &&
              response.data[i].id != payload.id
            ) {
              todayEvents.push(response.data[i]);
            }
          }

          commit("setShowNextButton", false);
          commit("setShowPreviousButton", false);
          commit("updateEvents", todayEvents);
        })
        .catch((error) => {
          console.log(error);
        });

      commit("updateMarkers", []);

      commit("setIsLoading", false);
    },

    async getEvents({ commit, state }, payload) {
      if (state.category != payload.category) {
        commit("setCurrentPage", 1);
      }

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      document
        .getElementById(payload.underline[1])
        .classList.add("category-underline");
      document
        .getElementById(payload.underline[2])
        .classList.remove("category-underline");
      document
        .getElementById(payload.underline[3])
        .classList.remove("category-underline");

      commit("setCategory", payload.category);

      commit("setIsLoading", true);

      await axios
        .get(
          `https://pme-backend.herokuapp.com/api/v1/${state.category}/${state.timeFrame}/?page=${state.currentPage}`
        )
        .then((response) => {
          commit("setShowNextButton", false);
          if (response.data.next) {
            commit("setShowNextButton", true);
          }

          commit("setShowPreviousButton", false);
          if (response.data.previous) {
            commit("setShowPreviousButton", true);
          }
          commit("updateEvents", response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });

      commit("updateMarkers", []);

      for (let i = 0; i < state.events.length; i++) {
        state.markers.push({
          id: parseInt(state.events[i].id),

          position: {
            lat: parseFloat(state.events[i].lat_long.split(" ")[0]),
            lng: parseFloat(state.events[i].lat_long.split(" ")[1]),
          },
        });
      }
      if (state.markers.length == 0) {
        commit("setIsEmpty", true);
      } else {
        commit("setIsEmpty", false);
      }

      commit("setIsLoading", false);
    },
  },
  modules: {},
});
