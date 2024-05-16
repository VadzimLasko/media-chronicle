import addToFollowApi from '@/api/addToFollow.js';

export const mutationTypes = {
    addToFollowStart: "[addToFollow] Add to follow start",
    addToFollowSuccess: "[addToFollow] Add to follow success",
    addToFollowFailure: "[addToFollow] Add to follow failure",
  };
  
export const actionTypes = {
    addToFollow: "[addToFollow] Add to follow",
  };

const mutations = {
    [mutationTypes.addToFollowStart]() {},
    [mutationTypes.addToFollowSuccess]() {},
    [mutationTypes.addToFollowFailure]() {},
};
  
const actions = {
    async [actionTypes.addToFollow]({ commit }, { slug, isFollowed }) {
        try {
            commit(mutationTypes.addToFollowStart);

            const profile = isFollowed
                ? await addToFollowApi.removeFromFollow(slug)
                : await addToFollowApi.addToFollow(slug);

            commit(mutationTypes.addToFollowSuccess, profile);
            return profile;
        } catch (error) {
            commit(mutationTypes.addToFollowFailure, error);
        }
    },
};
  
export default {
    mutations,
    actions,
};