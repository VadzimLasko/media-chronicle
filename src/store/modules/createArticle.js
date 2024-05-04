import articleApi from "@/api/article.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[createArticle] Create article start",
  createArticleSuccess: "[createArticle] Create article success",
  createArticleFailure: "[createArticle] Create article failure",
};

export const actionTypes = {
  createArticle: "[createArticle] Create article",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createArticle]({ commit }, { articleInput }) {
    return new Promise((resolve) => {
      commit(mutationTypes.createArticleStart);
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          commit(mutationTypes.createArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          commit(
            mutationTypes.createArticleFailure,
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
