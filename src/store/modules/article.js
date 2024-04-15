import articleApi from "@/api/article.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: "[article] Get Article Start",
  getArticleSucces: "[article] Get Article Succes",
  getArticleFailure: "[article] Get Article Failure",

  deleteArticleStart: "[article] Delete Article Start",
  deleteArticleSucces: "[article] Delete Article Succes",
  deleteArticleFailure: "[article] Delete Article Failure",
};

export const actionTypes = {
  getArticle: "[article] Get Article",
  deleteArticle: "[article] Delete Article",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSucces](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSucces]() {
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
          commit(mutationTypes.getArticleSucces, article);
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
          commit(mutationTypes.deleteArticleSucces);
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
