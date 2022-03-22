<template>
  <div>
    <section class="filter">
      <div class="filter-box">
        <a
          href="#!"
          v-on:click="
            $store.dispatch('getEvents', {
              category: 'all-events',
              underline: { 1: 'all', 2: 'djs', 3: 'live' },
            })
          "
          class="underline"
          id="all"
          >All</a
        >
        <a
          href="#!"
          v-on:click="
            $store.dispatch('getEvents', {
              category: 'djs',
              underline: { 1: 'djs', 2: 'live', 3: 'all' },
            })
          "
          class="underline"
          id="djs"
          >DJ's</a
        >
        <a
          href="#!"
          v-on:click="
            $store.dispatch('getEvents', {
              category: 'live-music',
              underline: { 1: 'live', 2: 'all', 3: 'djs' },
            })
          "
          class="underline"
          id="live"
          >Live Music</a
        >

        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ $store.state.displayTimeFrame }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a v-on:click="filterWholePeriod" class="dropdown-item" href="#!"
              >Whole Period</a
            >
            <a v-on:click="filterToday" class="dropdown-item" href="#!"
              >Today</a
            >
            <a v-on:click="filterTomorrow" class="dropdown-item" href="#!"
              >Tomorrow</a
            >
            <a v-on:click="filterThisWeek" class="dropdown-item" href="#!"
              >This Week</a
            >
            <a v-on:click="filterThisWeekend" class="dropdown-item" href="#!"
              >This Weekend
            </a>
          </div>
        </div>
        <form style="display: inline" method="get" action="/search">
          <input type="text" placeholder="Search.." name="query" />
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "EventFilter",
  methods: {
    filterWholePeriod() {
      this.$store.commit("setCurrentPage", 1);
      this.$store.commit("setTimeFrame", "whole-period");
      this.$store.commit("setDisplayTimeFrame", "Whole Period");

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      if (this.$store.state.category == "all-events") {
        this.$store.dispatch("getEvents", {
          category: "all-events",
          underline: { 1: "all", 2: "djs", 3: "live" },
        });
      }
      if (this.$store.state.category == "djs") {
        this.$store.dispatch("getEvents", {
          category: "djs",
          underline: { 1: "djs", 2: "live", 3: "all" },
        });
      }
      if (this.$store.state.category == "live-music") {
        this.$store.dispatch("getEvents", {
          category: "live-music",
          underline: { 1: "live", 2: "all", 3: "djs" },
        });
      }
    },

    filterToday() {
      this.$store.commit("setCurrentPage", 1);
      this.$store.commit("setTimeFrame", "today");
      this.$store.commit("setDisplayTimeFrame", "Today");

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      if (this.$store.state.category == "all-events") {
        this.$store.dispatch("getEvents", {
          category: "all-events",
          underline: { 1: "all", 2: "djs", 3: "live" },
        });
      }
      if (this.$store.state.category == "djs") {
        this.$store.dispatch("getEvents", {
          category: "djs",
          underline: { 1: "djs", 2: "live", 3: "all" },
        });
      }
      if (this.$store.state.category == "live-music") {
        this.$store.dispatch("getEvents", {
          category: "live-music",
          underline: { 1: "live", 2: "all", 3: "djs" },
        });
      }
    },

    filterTomorrow() {
      this.$store.commit("setCurrentPage", 1);
      this.$store.commit("setTimeFrame", "tomorrow");
      this.$store.commit("setDisplayTimeFrame", "Tomorrow");

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      if (this.$store.state.category == "all-events") {
        this.$store.dispatch("getEvents", {
          category: "all-events",
          underline: { 1: "all", 2: "djs", 3: "live" },
        });
      }
      if (this.$store.state.category == "djs") {
        this.$store.dispatch("getEvents", {
          category: "djs",
          underline: { 1: "djs", 2: "live", 3: "all" },
        });
      }
      if (this.$store.state.category == "live-music") {
        this.$store.dispatch("getEvents", {
          category: "live-music",
          underline: { 1: "live", 2: "all", 3: "djs" },
        });
      }
    },

    filterThisWeek() {
      this.$store.commit("setCurrentPage", 1);
      this.$store.commit("setTimeFrame", "this-week");
      this.$store.commit("setDisplayTimeFrame", "This Week");

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      if (this.$store.state.category == "all-events") {
        this.$store.dispatch("getEvents", {
          category: "all-events",
          underline: { 1: "all", 2: "djs", 3: "live" },
        });
      }
      if (this.$store.state.category == "djs") {
        this.$store.dispatch("getEvents", {
          category: "djs",
          underline: { 1: "djs", 2: "live", 3: "all" },
        });
      }
      if (this.$store.state.category == "live-music") {
        this.$store.dispatch("getEvents", {
          category: "live-music",
          underline: { 1: "live", 2: "all", 3: "djs" },
        });
      }
    },

    filterThisWeekend() {
      this.$store.commit("setCurrentPage", 1);
      this.$store.commit("setTimeFrame", "this-weekend");
      this.$store.commit("setDisplayTimeFrame", "This Weekend");

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      if (this.$store.state.category == "all-events") {
        this.$store.dispatch("getEvents", {
          category: "all-events",
          underline: { 1: "all", 2: "djs", 3: "live" },
        });
      }
      if (this.$store.state.category == "djs") {
        this.$store.dispatch("getEvents", {
          category: "djs",
          underline: { 1: "djs", 2: "live", 3: "all" },
        });
      }
      if (this.$store.state.category == "live-music") {
        this.$store.dispatch("getEvents", {
          category: "live-music",
          underline: { 1: "live", 2: "all", 3: "djs" },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
$sm: 576px;
$md: 767px;
$lg: 992px;
$xl: 1200px;
$xxl: 1400px;

$gray: #333333;
$red: #e5091c;

.filter {
  min-height: 70px;
  max-width: 1250px;
  margin: auto;
  @media screen and (max-width: $md) {
    min-height: 130px;
  }

  .filter-box {
    max-width: 1250px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 18px;
    @media screen and (max-width: $sm) {
      padding-left: 18px;
    }

    .underline:hover {
      border-bottom: 3px solid #e5091c;
      padding-bottom: 23px;
      @media screen and (max-width: $md) {
        padding-bottom: 5px;
      }
    }

    a {
      display: inline;
      color: black;
      font-weight: 400;
      font-size: 20px;
      text-decoration: none;
      margin-right: 20px;
      @media screen and (max-width: $lg) {
        margin-right: 15px;
      }
      @media screen and (max-width: $md) {
        margin-right: 12px;
      }
      @media screen and (max-width: $sm) {
        font-size: 17px;
      }
    }

    .dropdown {
      display: inline;
      padding-top: 3px;

      a {
        display: block;
      }

      .btn-secondary {
        font-size: 20px;
        color: #000;
        background-color: white;
        border: none;
        font-weight: 400;
        padding-top: 0px;
        @media screen and (max-width: $sm) {
          font-size: 17px;
        }
      }
      .btn-secondary:focus {
        box-shadow: none;
      }
    }
    input {
      display: inline;
      line-height: 28px;
      border: 2px solid #cccccc;
      border-radius: 3px;
      background-color: #fcfcfc;
      float: right;
      width: 350px;
      padding-left: 10px;

      @media screen and (max-width: $lg) {
        width: 300px;
      }
      @media screen and (max-width: $md) {
        width: 350px;
        float: left;
        margin-top: 15px;
      }
      @media screen and (max-width: $sm) {
        width: 250px;
      }
    }
  }
}
</style>
