import { createRouter, createWebHistory } from "vue-router";
import GlobalFeedView from "@/views/GlobalFeedView";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import YourFeedView from "@/views/YourFeedView";
import TagFeedView from "@/views/TagFeedView";
const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeedView,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: YourFeedView,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: TagFeedView,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: GlobalFeedView,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: GlobalFeedView,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: GlobalFeedView,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeedView,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeedView,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeedView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
