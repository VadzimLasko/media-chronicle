import articleApi from "@/api/article.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  updateArticleStart: "[editArticle] Update article start",
  updateArticleSuccess: "[editArticle] Update article success",
  updateArticleFailure: "[editArticle] Update article failure",

  getArticleStart: "[editArticle] Get article start",
  getArticleSuccess: "[editArticle] Get article success",
  getArticleFailure: "[editArticle] Get article failure",
};

export const actionTypes = {
  updateArticle: "[editArticle] Update article",
  getArticle: "[editArticle] Get article",
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.updateArticle]({ commit }, { slug, articleInput }) {
    return new Promise((resolve) => {
      commit(mutationTypes.updateArticleStart);
      articleApi
        .editArticle(slug, articleInput)
        .then((article) => {
          commit(mutationTypes.updateArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors,
          );
        });
    });
  },
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
};

export default {
  state,
  mutations,
  actions,
};
