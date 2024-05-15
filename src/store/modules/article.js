import articleApi from "@/api/article.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: "[article] Get article start",
  getArticleSuccess: "[article] Get article success",
  getArticleFailure: "[article] Get article failure",

  deleteArticleStart: "[article] Delete article start",
  deleteArticleSuccess: "[article] Delete article success",
  deleteArticleFailure: "[article] Delete article failure",
};

export const actionTypes = {
  getArticle: "[article] Get article",
  deleteArticle: "[article] Delete article",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {
    state.data = null;
  },
  [mutationTypes.deleteArticleFailure]() {},
};

const actions = {
  async [actionTypes.getArticle]({ commit }, { slug }) {
    try {
      commit(mutationTypes.getArticleStart);
      const article = await articleApi.getArticle(slug);
      commit(mutationTypes.getArticleSuccess, article);
      return article;
    } catch (result) {
      commit(mutationTypes.getArticleFailure, result.response.data.errors);
    }
  },
  async [actionTypes.deleteArticle]({ commit }, { slug }) {
    try {
      commit(mutationTypes.deleteArticleStart);
      await articleApi.deleteArticle(slug);
      commit(mutationTypes.deleteArticleSuccess);
    } catch (result) {
      commit(mutationTypes.deleteArticleFailure, result.response.data.errors);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
