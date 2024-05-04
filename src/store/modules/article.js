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
  [actionTypes.getArticle]({ commit }, { slug }) {
    return new Promise((resolve) => {
      commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
          commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          commit(mutationTypes.getArticleFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.deleteArticle]({ commit }, { slug }) {
    return new Promise((resolve) => {
      commit(mutationTypes.deleteArticleStart);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          commit(mutationTypes.deleteArticleSuccess);
          resolve();
        })
        .catch((result) => {
          commit(
            mutationTypes.deleteArticleFailure,
            result.response.data.errors,
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
