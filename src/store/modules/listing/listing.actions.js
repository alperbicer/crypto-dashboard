import { ADD_COIN_PAIR, UPDATE_TICKER, REMOVE_COIN_PAIR, SET_DEFAULT_CURRENCY } from './listing.types';
export default {
  [ADD_COIN_PAIR]({ commit }, data) {
    commit(ADD_COIN_PAIR, data);
  },
  [UPDATE_TICKER]({ commit }, data) {
    commit(UPDATE_TICKER, data);
  },
  [REMOVE_COIN_PAIR]({ commit }, data) {
    commit(REMOVE_COIN_PAIR, data);
  },
  [SET_DEFAULT_CURRENCY]({ commit }, data) {
    commit(SET_DEFAULT_CURRENCY, data);
  },
};
