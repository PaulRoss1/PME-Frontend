<template>
  <div class="page-search events">
    <event-map></event-map>
    <div
      class="is-loading-bar"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <p class="searching">Searching: {{ query }}</p>

    <event-cards></event-cards>
  </div>
</template>

<script>
import axios from "axios";
import EventCards from "../components/EventCards.vue";
import EventMap from "../components/EventMap.vue";

export default {
  name: "Search",
  data() {
    return {
      query: "",
    };
  },
  components: { EventCards, EventMap },
  mounted() {
    document.title = "Search | PME";

    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    if (params.get("query")) {
      this.query = params.get("query");

      this.performSearch();
    }
  },
  methods: {
    async performSearch() {
      this.$store.commit("setIsLoading", true);
      await axios
        .post("https://pme-backend.herokuapp.com/api/v1/search/", {
          query: this.query,
        })
        .then((response) => {
          this.events = response.data;
          this.$store.commit("updateEvents", response.data);
        })
        .catch((error) => {
          console.log("error");
        });

      for (let i = 0; i < this.$store.state.events.length; i++) {
        this.$store.state.markers.push({
          id: parseInt(this.$store.state.events[i].id),

          position: {
            lat: parseFloat(this.$store.state.events[i].lat_long.split(" ")[0]),
            lng: parseFloat(this.$store.state.events[i].lat_long.split(" ")[1]),
          },
        });
      }

      if (this.$store.state.events.length == 0) {
        this.$store.state.isEmpty = true;
      } else {
        this.$store.state.isEmpty = false;
      }

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

.searching {
  margin-top: 20px;
  color: $gray;
  font-size: 20px;
  margin-left: 5%;
}
</style>
