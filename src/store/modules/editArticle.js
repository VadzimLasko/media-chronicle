import articleApi from "@/api/article.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  updateArticleStart: "[updateArticle] Update article start",
  updateArticleSucces: "[updateArticle] Update article succes",
  updateArticleFailure: "[updateArticle] Update article failure",

  getArticleStart: "[updateArticle] Get article start",
  getArticleSucces: "[updateArticle] Get article succes",
  getArticleFailure: "[updateArticle] Get article failure",
};

export const actionTypes = {
  updateArticle: "[updateArticle] Update article",
  getArticle: "[updateArticle] Get article",
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSucces](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  /////////////
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getArticleSucces](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.validationErrors = payload;
  },
}; //////////

const actions = {
  [actionTypes.updateArticle]({ commit }, { slug, articleInput }) {
    return new Promise((resolve) => {
      commit(mutationTypes.updateArticleStart);
      articleApi
        .editArticle(slug, articleInput)
        .then((article) => {
          commit(mutationTypes.updateArticleSucces, article);
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
          commit(mutationTypes.getArticleSucces, article);
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
