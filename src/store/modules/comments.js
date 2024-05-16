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
  [mutationTypes.createCommentSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createCommentFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  async [actionTypes.getComments]({ commit }, { slug }) {
    try {
      commit(mutationTypes.getCommentsStart);
      const comments = await commentsApi.getComments(slug);
      commit(mutationTypes.getCommentsSuccess, comments);
      return comments;
    } catch (error) {
      commit(mutationTypes.getCommentsFailure, error.response.data.errors);
    }
  },
  async [actionTypes.deleteComment]({ commit }, { slug, idComment }) {
    try {
      commit(mutationTypes.deleteCommentStart);
      await commentsApi.deleteComment(slug, idComment);
      commit(mutationTypes.deleteCommentSuccess);
      return true;
    } catch (error) {
      commit(mutationTypes.deleteCommentFailure, error);
      return false;
    }
  },
  async [actionTypes.createComment]({commit}, {slug, commentInput}) {
    try {
      commit(mutationTypes.createCommentStart);
      const comment = await commentsApi.addComments(slug, commentInput);
      commit(mutationTypes.createCommentSuccess, comment);
      return comment;
    } catch (error) {
      commit(mutationTypes.createCommentFailure, error.response.data.errors);
      return false;
    }
  },
};

export default {
  state,
  mutations,
  actions,
};