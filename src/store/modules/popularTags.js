import popularTagsApi from "@/api/popularTags";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getPopularTagsStart: "[popularTags] Get PopularTags Start",
  getPopularTagsSucces: "[popularTags] Get PopularTags Succes",
  getPopularTagsFailure: "[popularTags] Get PopularTags Failure",
};

export const actionTypes = {
  getPopularTags: "[popularTags] Get PopularTags",
};

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSucces](state, payload) {
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
          commit(mutationTypes.getPopularTagsSucces, tags);
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
