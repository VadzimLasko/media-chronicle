import { createStore } from "vuex";
import auth from "@/store/modules/auth.js";
import feed from "@/store/modules/feed.js";
import popularTags from "@/store/modules/popularTags.js";

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, feed, popularTags },
});

export default store;
