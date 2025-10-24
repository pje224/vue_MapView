import { createRouter, createWebHistory } from "vue-router";
import MapView from "@/views/MapView.vue";
import Map_marker from "@/views/Map_marker.vue";
import Map_location from "@/views/Map_location.vue";
const routes = [
  { path: "/", component: MapView },
  { path: "/marker", component: Map_marker },
  { path: "/location", component: Map_location },

];
export default createRouter({
  history: createWebHistory(),
  routes,
});
