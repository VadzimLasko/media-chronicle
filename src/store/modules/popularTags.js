import popularTagsApi from "@/api/popularTags";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getPopularTagsStart: "[popularTags] Get popular tags start",
  getPopularTagsSuccess: "[popularTags] Get popular tags success",
  getPopularTagsFailure: "[popularTags] Get popular tags failure",
};

export const actionTypes = {
  getPopularTags: "[popularTags] Get popular tags",
};

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getPopularTagsFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getPopularTags]({ commit }) {
    return new Promise((resolve) => {
      commit(mutationTypes.getPopularTagsStart);
      popularTagsApi
        .getPopularTags()
        .then((tags) => {
          commit(mutationTypes.getPopularTagsSuccess, tags);
          resolve(tags);
        })
        .catch((result) => {
          commit(
            mutationTypes.getPopularTagsFailure,
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
