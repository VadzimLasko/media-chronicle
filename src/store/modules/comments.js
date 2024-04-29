import commentsApi from "@/api/comments.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getCommentsStart: "[comments] Get comments start",
  getCommentsSuccess: "[comments] Get comments success",
  getCommentsFailure: "[comments] Get comments failure",

//   deleteCommentStart: "[comments] Delete comment start",
//   deleteCommentSuccess: "[comments] Delete comment success",
//   deleteCommentFailure: "[comments] Delete comment failure",
};

export const actionTypes = {
  getComments: "[comments] Get comments",
//   deleteComment: "[comments] Delete comment",
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

//   [mutationTypes.deleteCommentStart]() {},
//   [mutationTypes.deleteCommentSuccess]() {
//     state.data = null;
//   },
//   [mutationTypes.deleteCommentFailure]() {},
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

};

export default {
  state,
  mutations,
  actions,
};