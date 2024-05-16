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
  [mutationTypes.updateArticleSuccess](state, payload ) {
    state.isSubmitting = false;
    state.article = payload;
  },
  [mutationTypes.updateArticleFailure](state) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.article = null;
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
  async [actionTypes.updateArticle]({ commit }, { slug, articleInput }) {
    try {
      commit(mutationTypes.updateArticleStart);
      const article = await articleApi.editArticle(slug, articleInput);
      commit(mutationTypes.updateArticleSuccess, article);
      return article;
    } catch(error) {
      commit(mutationTypes.updateArticleFailure, error.response.data.errors);
      return false;
    };
  },
  async [actionTypes.getArticle]({ commit }, { slug }) {
    try {
      commit(mutationTypes.getArticleStart);
      const article = await articleApi.getArticle(slug)
      commit(mutationTypes.getArticleSuccess, article);
      return article;
      } catch(error) {
          commit(mutationTypes.getArticleFailure, error.response.data.errors);
      };
    }
};

export default {
  state,
  mutations,
  actions,
};
