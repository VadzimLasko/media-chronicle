import feedApi from "@/api/feed";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: "[feed] getFeedStart",
  getFeedSucces: "[feed] getFeedSucces",
  getFeedFailure: "[feed] getFeedFailure",
};

export const actionTypes = {
  getFeed: "[feed] getFeed",
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSucces](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getFeed]({ commit }, { apiUrl }) {
    return new Promise((resolve) => {
      commit(mutationTypes.getFeedStart);
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          commit(mutationTypes.getFeedSucces, response.data);
          resolve(response.data);
        })
        .catch((result) => {
          commit(mutationTypes.getFeedFailure, result.response.data.errors);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
