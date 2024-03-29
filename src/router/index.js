import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView";
import RegisterView from "@/views/RegisterView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
