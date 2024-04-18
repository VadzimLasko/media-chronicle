import { mutationTypes as authMutationTypes } from "@/store/modules/auth.js";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutations = {
  [authMutationTypes.updateCurretnUserStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [authMutationTypes.updateCurrentUserSucces](state) {
    state.isSubmitting = false;
  },
  [authMutationTypes.updateCurrentUserFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

export default {
  state,
  mutations,
};
