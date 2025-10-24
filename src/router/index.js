import { createRouter, createWebHistory } from "vue-router";
import MapView from "@/views/MapView.vue";
const routes = [{ path: "/", component: MapView }];
export default createRouter({
  history: createWebHistory(),
  routes,
});
