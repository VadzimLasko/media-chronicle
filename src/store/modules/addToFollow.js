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
    [actionTypes.addToFollow]({ commit }, { slug, isFollowed }) {
      return new Promise((resolve) => {
        commit(mutationTypes.addToFollowStart);
  
        const promise = isFollowed
          ? addToFollowApi.removeFromFollow(slug)
          : addToFollowApi.addToFollow(slug);
  
        promise
          .then((profile) => {
            commit(mutationTypes.addToFollowSuccess, profile);
            resolve(profile);
          })
          .catch(() => {
            commit(mutationTypes.addToFollowFailure);
          });
      });
    },
  };
  
  export default {
    mutations,
    actions,
  };