import commentsApi from "@/api/comments.js";

export const state = {
  data: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  getCommentsStart: "[comments] Get comments start",
  getCommentsSuccess: "[comments] Get comments success",
  getCommentsFailure: "[comments] Get comments failure",

  deleteCommentStart: "[comments] Delete comment start",
  deleteCommentSuccess: "[comments] Delete comment success",
  deleteCommentFailure: "[comments] Delete comment failure",

  createCommentStart: "[createComment] Create comment start",
  createCommentSuccess: "[createComment] Create comment success",
  createCommentFailure: "[createComment] Create comment failure",
};

export const actionTypes = {
  getComments: "[comments] Get comments",
  deleteComment: "[comments] Delete comment",
  createComment: "[createComment] Create comment",
};

const mutations = {
  [mutationTypes.getCommentsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getCommentsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getCommentsFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.deleteCommentStart]() {},
  [mutationTypes.deleteCommentSuccess]() {
  },
  [mutationTypes.deleteCommentFailure]() {},

  [mutationTypes.createCommentStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.createCommentSuccess](state, payload) {
    state.isSubmitting = false;
    // state.data = { ...state.data, payload };
  },
  [mutationTypes.createCommentFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.getComments]({ commit }, { slug }) {
    return new Promise((resolve) => {
      commit(mutationTypes.getCommentsStart);
      commentsApi
        .getComments(slug)
        .then((comments) => {
          commit(mutationTypes.getCommentsSuccess, comments);
          resolve(comments);
        })
        .catch((result) => {
          commit(mutationTypes.getCommentsFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.deleteComment]({ commit }, { slug, idComment}) {
    return new Promise((resolve) => {
      commit(mutationTypes.deleteCommentStart);
      commentsApi
        .deleteComment(slug, idComment)
        .then(() => {
          commit(mutationTypes.deleteCommentSuccess, );
          resolve();
        })
        .catch((result) => {
          commit(mutationTypes.deleteCommentFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.createComment]({ commit }, { slug, commentInput }) {
    return new Promise((resolve) => {
      commit(mutationTypes.createCommentStart);
      commentsApi
        .addComments(slug, commentInput)
        .then((comment) => {
          commit(mutationTypes.createCommentSuccess, comment);
          resolve(comment);
        })
        .catch(() => {
          commit(
            mutationTypes.createCommentFailure );
        });
    });
  },

};

export default {
  state,
  mutations,
  actions,
};