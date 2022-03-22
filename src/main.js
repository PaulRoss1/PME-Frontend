import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vue from "vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);
app
  .use(VueGoogleMaps, {
    load: {
      key: "YOUR_API_KEY",
    },
  })
  .use(store)
  .use(router, axios)
  .mount("#app");
