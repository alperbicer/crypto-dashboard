import { ADD_COIN_PAIR, UPDATE_TICKER, REMOVE_COIN_PAIR, SET_DEFAULT_CURRENCY } from './listing.types';
export default {
  [ADD_COIN_PAIR]({ commit }, value) {
    commit(ADD_COIN_PAIR, value);
  },
  [UPDATE_TICKER]({ commit }, value) {
    commit(UPDATE_TICKER, value);
  },
  [REMOVE_COIN_PAIR]({ commit }, value) {
    commit(REMOVE_COIN_PAIR, value);
  },
  [SET_DEFAULT_CURRENCY]({ commit }, value) {
    commit(SET_DEFAULT_CURRENCY, value);
  },
};
