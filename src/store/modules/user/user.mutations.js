import { SET_LOGGED_IN, SET_USER } from './user.types';
export default {
  [SET_LOGGED_IN]: (state, value) => {
    state.user.loggedIn = value;
  },
  [SET_USER]: (state, value) => {
    state.user.data = value;
  },
};
