import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Event from "../views/Event.vue";
import Search from "../views/Search.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/:slug/:id",
    name: "Event",
    component: Event,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
