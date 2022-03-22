<template>
  <div class="page-event">
    <router-link to="/" class="navbar-brand">
      <a class="back">Back</a></router-link
    >

    <div
      class="is-loading-bar"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <img v-bind:src="event[0].image" />

    <h2>{{ event[0].name }}</h2>

    <div v-if="!$store.state.isLoading">
      <hr />
    </div>

    <div class="container-fluid">
      <div v-if="!$store.state.isLoading" class="row">
        <div class="col-3">
          <span>Date:</span>
        </div>
        <div class="col">{{ event[0].date }}</div>
      </div>
      <div v-if="!$store.state.isLoading" class="row">
        <div class="col-3"><span>Venue:</span></div>
        <div class="col">{{ event[0].venue }}</div>
      </div>
      <div v-if="!$store.state.isLoading" class="row">
        <div class="col-3"><span>Address:</span></div>
        <div class="col">{{ event[0].address }}</div>
      </div>
      <div v-if="!$store.state.isLoading" class="row">
        <div class="col-3"><span>Event Type:</span></div>
        <div class="col">{{ event[0].event_type }}</div>
      </div>
    </div>

    <div v-if="$store.state.events.length > 0">
      <p class="more">More events on {{ event[0].date }}</p>

      <event-cards></event-cards>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventCards from "../components/EventCards.vue";

export default {
  name: "Event",
  components: { EventCards },

  data() {
    return {
      event: [{}],
    };
  },
  mounted() {
    if (document.getElementById("eventBox")) {
      document.getElementById("eventBox").remove();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    this.getEvent();
  },
  methods: {
    async getEvent() {
      this.$store.commit("updateEvents", []);
      this.$store.commit("setIsLoading", true);

      const slug = this.$route.params.slug;
      const id = this.$route.params.id;

      await axios
        .get(`https://pme-backend.herokuapp.com/api/v1/${slug}/${id}`)
        .then((response) => {
          this.event = response.data;

          document.title = this.event[0].name + " | PME";
        })
        .catch((error) => {
          console.log(error);
        });

      this.event[0].address = (
        this.event[0].address.split(",")[1] +
        ", " +
        this.event[0].address.split(",")[2] +
        ", Praha"
      ).replace(", undefined", "");

      this.$store.dispatch("getTodayEvents", {
        today: this.event[0].date,
        id: this.event[0].id,
      });

      this.$store.commit("setIsLoading", false);
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

.page-event {
  padding-top: 20px;
  .back {
    cursor: pointer;
    font-size: 20px;
    margin-left: 10%;
    color: $gray;
    text-decoration: none;
    font-size: 20px;
    text-align: center;
    background-color: #efefef;
    font-weight: 400;
    border: 1px solid rgb(184, 184, 184);
    border-radius: 3px;
    padding: 5px 8px 5px 8px;
    width: 100px;
  }
  .back:hover {
    background-color: #d6d6d6;
  }

  img {
    padding-top: 30px;
    margin: auto;
    display: block;
    margin-bottom: 2%;
    max-width: 450px;
    @media screen and (max-width: $sm) {
      max-width: 90%;
    }
  }
  h2 {
    text-align: center;
    margin-bottom: 2%;
    @media screen and (max-width: $sm) {
      padding-top: 20px;
    }
  }
  .container-fluid {
    max-width: 680px;
    font-size: 1.2rem;
    margin-bottom: 100px;

    @media screen and (max-width: $sm) {
      max-width: 90%;
      max-width: 90%;
      margin-bottom: 60px;
    }
    .row {
      padding-left: 14.5%;
      @media screen and (max-width: $sm) {
        padding-left: 0;
        font-size: 1rem;
      }
      span {
        font-weight: 700;
      }
    }
  }

  .more {
    color: $gray;
    font-size: 26px;
    font-weight: 500;
    margin-bottom: 90px;
    margin-left: 5%;

    @media screen and (max-width: $md) {
      text-align: center;
    }
    @media screen and (max-width: $sm) {
      font-size: 22px;
      margin-bottom: 50px;
    }
  }
}
</style>
