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
  registerStart: "[auth] registerStart",
  registerSucces: "[auth] registerSucces",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSucces: "[auth] loginSucces",
  loginFailure: "[auth] loginFailure",

  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSucces: "[auth] getCurrentUserSucces",
  getCurrentUserFailure: "[auth] getCurrentUserFailure",
};
export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  getCurrentUser: "[auth] getCurrentUser",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser; //так как это прописывается в модуле стора, то и стейт здесь будет только мудуля, не всего стора. Но название геттера будет глобальным, поэтому в других модклях такого названия нельзя давать.
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
  [mutationTypes.registerSucces](state, payload) {
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
  [mutationTypes.loginSucces](state, payload) {
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
  [mutationTypes.getCurrentUserSucces](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

const actions = {
  [actionTypes.register]({ commit }, credential) {
    //Здесь исп-ся деструктуризация т.к. в в экшн всегда приходит контекст, а внутри него сидит комит, диспатч и стейт.
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart);
      authApi
        .register(credential)
        .then((response) => {
          commit(mutationTypes.registerSucces, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log("result", result);
          commit(mutationTypes.registerFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.login]({ commit }, credential) {
    return new Promise((resolve) => {
      commit(mutationTypes.loginStart);
      authApi
        .login(credential)
        .then((response) => {
          console.log("response", response);
          commit(mutationTypes.loginSucces, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          console.log("result", result);
          commit(mutationTypes.loginFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.getCurrentUser]({ commit }) {
    return new Promise((resolve) => {
      console.log("начало getCurrentUserStart");
      commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then((response) => {
          console.log("response getCurrentUser", response);
          commit(mutationTypes.getCurrentUserSucces, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
