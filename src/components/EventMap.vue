<template>
  <section id="map">
    <GMapMap class="map" :center="center" :options="options">
      <GMapCluster @click="clusterInfoWindow">
        <GMapMarker
          :key="index"
          v-for="(m, index) in $store.state.markers"
          :position="m.position"
          :clickable="true"
          @click="eventInfoWindow(m)"
        >
        </GMapMarker>
      </GMapCluster>
    </GMapMap>
  </section>
</template>

<script>
export default {
  name: "EventMap",
  data() {
    return {
      options: {
        scrollwheel: false,
        zoom: 13,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            stylers: [{ saturation: -100 }],
          },
        ],
      },
      center: { lat: 50.0755, lng: 14.4378 },
    };
  },
  methods: {
    clusterInfoWindow(cluster) {
      let clusterMarkers = cluster.getMarkers();

      let clusterArray = [];

      for (let i = 0; i < clusterMarkers.length; i++) {
        clusterArray.push(
          `${JSON.stringify(clusterMarkers[i].position.lat())} ${JSON.stringify(
            clusterMarkers[i].position.lng()
          )}`
        );
      }

      let infoBoxText = [];

      for (let i = 0; i < this.$store.state.events.length; i++) {
        if (
          clusterArray.includes(
            `${String(
              parseFloat(this.$store.state.events[i].lat_long.split(" ")[0])
            )} ${String(
              parseFloat(this.$store.state.events[i].lat_long.split(" ")[1])
            )}`
          )
        ) {
          if (this.$store.state.events[i].name.length > 23) {
            infoBoxText.push(
              `<a href="${
                this.$store.state.events[i].get_absolute_url
              } ">${this.$store.state.events[i].name.slice(0, 20)}</h>` +
                "...<br/> "
            );
          } else {
            infoBoxText.push(
              `<a href="${this.$store.state.events[i].get_absolute_url} ">${this.$store.state.events[i].name}</h>` +
                "<br/>"
            );
          }
        }
      }

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      const el = document.createElement("div");
      el.setAttribute("id", "eventBox");
      el.classList.add("info-box");
      el.innerHTML = `<span>${infoBoxText}</span>`.replace(/,/g, "");
      const box = document.getElementsByClassName("headline")[0];
      box.appendChild(el);
    },

    eventInfoWindow(m) {
      let eventName = "";

      for (let x = 0; x < this.$store.state.events.length; x++) {
        if (this.$store.state.events[x].id == m.id) {
          eventName = this.$store.state.events[x].name;

          if (this.$store.state.events[x].name.length > 23) {
            eventName =
              `<a href="${
                this.$store.state.events[x].get_absolute_url
              } ">${this.$store.state.events[x].name.slice(0, 20)}</h>` + "...";
          } else {
            eventName = `<a href="${this.$store.state.events[x].get_absolute_url} ">${this.$store.state.events[x].name}</h>`;
          }
        }
      }

      if (document.getElementById("eventBox")) {
        document.getElementById("eventBox").remove();
      }

      const el = document.createElement("div");
      el.setAttribute("id", "eventBox");
      el.classList.add("info-box");
      el.innerHTML = `<span>${eventName}</span>`;
      const box = document.getElementsByClassName("headline")[0];
      box.appendChild(el);
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

#map {
  height: 520px;
  border-bottom: 5px solid $gray;
  .map {
    height: 100%;
  }
}
</style>
