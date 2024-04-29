import commentsApi from "@/api/comments.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createCommentStart: "[createComment] Create comment start",
  createCommentSuccess: "[createComment] Create comment success",
  createCommentFailure: "[createComment] Create comment failure",
};

export const actionTypes = {
  createComment: "[createComment] Create comment",
};

const mutations = {
  [mutationTypes.createCommentStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.createCommentSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createCommentFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createComment]({ commit }, { slug, commentInput }) {
    return new Promise((resolve) => {
      commit(mutationTypes.createCommentStart);
      commentsApi
        .addComments(slug, commentInput)
        .then((comment) => {
          commit(mutationTypes.createCommentSuccess, comment);
          resolve(comment);
        })
        .catch((result) => {
          commit(
            mutationTypes.createCommentFailure,
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
