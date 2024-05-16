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
  async [actionTypes.createArticle]({ commit }, { articleInput }) {
    try  {
      commit(mutationTypes.createArticleStart);
      const article = await articleApi.createArticle(articleInput);
      commit(mutationTypes.createArticleSuccess, article);
      return article;
    } catch(error) {
          commit(
            mutationTypes.createArticleFailure,
            error.response.data.errors
          );
          return false;
    };
  }
}


export default {
  state,
  mutations,
  actions,
};
