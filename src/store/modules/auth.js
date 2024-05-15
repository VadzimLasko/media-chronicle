import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: "[auth] Register start",
  registerSuccess: "[auth] Register success",
  registerFailure: "[auth] Register failure",

  loginStart: "[auth] Login start",
  loginSuccess: "[auth] Login success",
  loginFailure: "[auth] Login failure",

  getCurrentUserStart: "[auth] Get currentUser start",
  getCurrentUserSuccess: "[auth] Get currentUser success",
  getCurrentUserFailure: "[auth] Get currentUser failure",

  updateCurrentUserStart: "[auth] Update currentUser start",
  updateCurrentUserSuccess: "[auth] Update currentUser success",
  updateCurrentUserFailure: "[auth] Update currentUser failure",

  logout: "[auth] Logout",
};

export const actionTypes = {
  register: "[auth] Register",
  login: "[auth] Login",
  getCurrentUser: "[auth] Get currentUser",
  updateCurrentUser: "[auth] Update currentUser",
  logout: "[auth] Logout",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser; 
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },

  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationTypes.updateCurrentUserFailure](stte) {},

  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  async [actionTypes.register]({ commit }, credential) {
    try {
      commit(mutationTypes.registerStart);
      const response = await authApi.register(credential);
      commit(mutationTypes.registerSuccess, response.data.user);
      setItem("accessToken", response.data.user.token);
      return response.data.user;
    } catch (result) {
      commit(mutationTypes.registerFailure, result.response.data.errors);
    }
  },
  async [actionTypes.login]({ commit }, credential) {
    try {
      commit(mutationTypes.loginStart);
      const response = await authApi.login(credential);
      commit(mutationTypes.loginSuccess, response.data.user);
      setItem("accessToken", response.data.user.token);
      return response.data.user;
    } catch (result) {
      commit(mutationTypes.loginFailure, result.response.data.errors);
    }
  },
  async [actionTypes.getCurrentUser]({ commit }) {
    try {
      commit(mutationTypes.getCurrentUserStart);
      const response = await authApi.getCurrentUser();
      commit(mutationTypes.getCurrentUserSuccess, response.data.user);
      return response.data.user;
    } catch {
      commit(mutationTypes.getCurrentUserFailure);
    }
  },

  async [actionTypes.updateCurrentUser]({ commit }, { currentUserInput }) {
    try {
      commit(mutationTypes.updateCurrentUserStart);
      const user = await authApi.updateCurrentUser(currentUserInput);
      commit(mutationTypes.updateCurrentUserSuccess, user);
      return user;
    } catch {
      commit(mutationTypes.updateCurrentUserFailure);
    }
  },

  [actionTypes.logout]({ commit }) {
    setItem("accessToken", "");
    commit(mutationTypes.logout);
    return Promise.resolve();
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
