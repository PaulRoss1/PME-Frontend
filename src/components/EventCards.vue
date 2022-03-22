<template>
  <section class="events">
    <h1 class="no-events" v-if="$store.state.isEmpty">
      There are no events at this time.
    </h1>

    <div class="container">
      <div class="row">
        <div
          class="col-md-4"
          v-for="event in $store.state.events"
          v-bind:key="event.id"
        >
          <div class="card">
            <div @click="reloadPage">
              <router-link v-bind:to="event.get_absolute_url">
                <img v-bind:src="event.image" class="card-img-top"
              /></router-link>
            </div>
            <div class="card-body">
              <div @click="reloadPage">
                <router-link
                  style="text-decoration: none"
                  v-bind:to="event.get_absolute_url"
                  ><h5 class="card-title">
                    {{ event.name }}
                  </h5></router-link
                >
              </div>
              <p class="card-text">{{ event.event_type }}, {{ event.date }}</p>
              <p>{{ event.venue }}</p>
              <button @click="reloadPage">
                <router-link
                  style="text-decoration: none; color: #333333"
                  v-bind:to="event.get_absolute_url"
                  >View details</router-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center">
      <template v-if="$store.state.showPreviousButton">
        <button class="previous-next" @click="loadPrevious()">Previous</button>
      </template>
      <template v-if="$store.state.showNextButton">
        <button class="previous-next" @click="loadNext()">Next</button>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "EventCards",
  methods: {
    reloadPage() {
      window.location.reload();
    },
    loadNext() {
      this.$store.commit("setCurrentPage", this.$store.state.currentPage + 1);

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      window.scrollTo({
        top: 740,
        behavior: "smooth",
      });

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
    loadPrevious() {
      this.$store.commit("setCurrentPage", this.$store.state.currentPage - 1);

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      window.scrollTo({
        top: 740,
        behavior: "smooth",
      });

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

.events {
  padding-top: 23px;
  padding-bottom: 110px;
  background-color: #f4f4f4;

  .no-events {
    text-align: center;
    margin-top: 6%;
    margin-bottom: 8%;
    font-size: 2rem;
    padding-left: 20px;
    padding-right: 20px;
  }
  .container {
    max-width: 1250px;
    .card {
      margin: 20px 10px;
      min-height: 425px;
      @media screen and (max-width: $md) {
        max-width: 400px;
        margin: 20px auto;
      }
      img:hover {
        animation: 0.8s ease 0s normal forwards 1 fadein;
      }
      @keyframes fadein {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0.85;
        }
      }

      .card-body {
        margin-top: auto;
        h5 {
          color: $gray;
        }
        h5:hover {
          color: $red;
        }
        p {
          color: rgb(87, 87, 87);
        }
        button {
          font-weight: 400;
          color: rgb(236, 236, 236) !important;
          border: 1px solid rgb(184, 184, 184);
          border-radius: 3px;
          padding: 5px 8px 5px 8px;
        }
        button:hover {
          background-color: #d6d6d6;
        }
      }
    }
  }
  .previous-next {
    color: $gray;
    text-decoration: none;
    font-size: 20px;
    margin: auto;
    margin-top: 5%;
    text-align: center;
    background-color: #efefef;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: 400;
    border: 1px solid rgb(184, 184, 184);
    border-radius: 3px;
    padding: 5px 8px 5px 8px;
    width: 100px;
  }
  .previous-next:hover {
    background-color: #d6d6d6;
  }
}
</style>
