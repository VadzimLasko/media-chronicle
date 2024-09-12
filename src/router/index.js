import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import GlobalFeedView from "@/views/GlobalFeedView.vue";

const RegisterView = defineAsyncComponent(() =>
  import("@/views/RegisterView.vue")
);
const LoginView = defineAsyncComponent(() => import("@/views/LoginView.vue"));
const YourFeedView = defineAsyncComponent(() =>
  import("@/views/YourFeedView.vue")
);
const TagFeedView = defineAsyncComponent(() =>
  import("@/views/TagFeedView.vue")
);
const Article = defineAsyncComponent(() => import("@/views/Article.vue"));
const CreateArticle = defineAsyncComponent(() =>
  import("@/views/CreateArticle.vue")
);
const EditArticle = defineAsyncComponent(() =>
  import("@/views/EditArticle.vue")
);
const Settings = defineAsyncComponent(() => import("@/views/Settings.vue"));
const UserProfile = defineAsyncComponent(() =>
  import("@/views/UserProfile.vue")
);
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
  {
    path: "/profiles/:slug/followedAuthors",
    name: "userFollowedAuthors",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
