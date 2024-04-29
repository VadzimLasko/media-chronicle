import { createStore } from "vuex";
import auth from "@/store/modules/auth.js";
import feed from "@/store/modules/feed.js";
import popularTags from "@/store/modules/popularTags.js";
import article from "@/store/modules/article.js";
import createArticle from "@/store/modules/createArticle.js";
import editArticle from "@/store/modules/editArticle.js";
import settings from "@/store/modules/settings.js";
import addToFavorites from "@/store/modules/addToFavorites.js";
import userProfile from "@/store/modules/userProfile.js";
import addToFollow from "@/store/modules/addToFollow.js";
import comments from "@/store/modules/comments.js";
import createComment from "@/store/modules/createComment.js";
const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile,
    addToFollow,
    comments,
    createComment
  },
});

export default store;
