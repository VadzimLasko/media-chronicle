import { createStore } from "vuex";
import auth from "@/store/modules/auth.js";
import feed from "@/store/modules/feed.js";
import popularTags from "@/store/modules/popularTags.js";
import article from "@/store/modules/article.js";
import createArticle from "@/store/modules/createArticle.js";
import editArticle from "@/store/modules/editArticle.js";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, feed, popularTags, article, createArticle, editArticle },
});

export default store;
