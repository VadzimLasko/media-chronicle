import addToFavoritesApi from "@/api/addToFavorites.js";

export const mutationTypes = {
  addToFavoritesStart: "[addToFavorites] Add to favorites start",
  addToFavoritesSuccess: "[addToFavorites] Add to favorites success",
  addToFavoritesFailure: "[addToFavorites] Add to favorites failure",
};

export const actionTypes = {
  addToFavorites: "[addToFavorites] Add to favorites",
};

export const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
};

const actions = {
  async [actionTypes.addToFavorites]({ commit }, { slug, isFavorited }) {
    commit(mutationTypes.addToFavoritesStart);
    try {
      const article = isFavorited
        ? await addToFavoritesApi.removeFromFavorites(slug)
        : await addToFavoritesApi.addToFavorites(slug);

      commit(mutationTypes.addToFavoritesSuccess, article);
      return article;
    } catch (error) {
      commit(mutationTypes.addToFavoritesFailure);
    }
  },
};

export default {
  mutations,
  actions,
};
