<template>
  <div class="home">
    <event-map></event-map>

    <event-filter></event-filter>

    <div
      class="is-loading-bar"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <event-cards></event-cards>
  </div>
</template>

<script>
import EventFilter from "../components/EventFilter.vue";
import EventCards from "../components/EventCards.vue";
import EventMap from "../components/EventMap.vue";

export default {
  name: "Home",
  components: { EventFilter, EventCards, EventMap },
  mounted() {
    document.title = "Home | PME";
    this.$store.dispatch("getEvents", {
      category: "all-events",
      underline: { 1: "all", 2: "djs", 3: "live" },
    });

    if (document.getElementById("eventBox")) {
      document.getElementById("eventBox").remove();
    }
  },
};
</script>
