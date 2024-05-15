import feedApi from "@/api/feed";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: "[feed] Get feed start",
  getFeedSuccess: "[feed] Get feed success",
  getFeedFailure: "[feed] Get feed failure",
};

export const actionTypes = {
  getFeed: "[feed] Get feed",
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  async [actionTypes.getFeed]({ commit }, { apiUrl }) {
    try {
      commit(mutationTypes.getFeedStart);
      const response = await feedApi.getFeed(apiUrl);
      commit(mutationTypes.getFeedSuccess, response.data);
      return response.data;
    } catch (error) {
      commit(mutationTypes.getFeedFailure, error.response.data.errors);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
