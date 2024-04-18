import { createRouter, createWebHistory } from "vue-router";
import GlobalFeedView from "@/views/GlobalFeedView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import YourFeedView from "@/views/YourFeedView.vue";
import TagFeedView from "@/views/TagFeedView.vue";
import Article from "@/views/Article.vue";
import CreateArticle from "@/views/CreateArticle.vue";
import EditArticle from "@/views/EditArticle.vue";
import Settings from "@/views/Settings.vue";
import UserProfile from "@/views/UserProfile.vue";

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
    component: CreateArticle,
  },

  {
    path: "/articles/:slug",
    name: "article",
    component: Article,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: EditArticle,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: UserProfile,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
