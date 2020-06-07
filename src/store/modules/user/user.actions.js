import { FETCH_USER } from './user.types';
export default {
  [FETCH_USER]({ commit }, value) {
    commit('SET_LOGGED_IN', value !== null);
    if (value) {
      commit('SET_USER', {
        displayName: value.displayName,
        email: value.email,
      });
    } else {
      commit('SET_USER', null);
    }
  },
};
