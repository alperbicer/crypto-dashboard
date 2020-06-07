import Vue from 'vue';
import { ADD_COIN_PAIR, UPDATE_TICKER, REMOVE_COIN_PAIR, SET_DEFAULT_CURRENCY } from './listing.types';
export default {
  [UPDATE_TICKER]: (state, value) => {
    const tick = state.tickerList[value.symbol];
    value.pchg = tick ? (value.price > tick.price ? 1 : -1) : 1;
    Vue.set(state.tickerList, value.symbol, value);
  },
  [ADD_COIN_PAIR]: (state, value) => {
    if (!state.tickerList[value.symbol]) {
      state.currencyList.push(value);
    }
    Vue.set(state.tickerList, value.symbol, { pchg: 1 });
  },
  [REMOVE_COIN_PAIR]: (state, value) => {
    Vue.delete(state.tickerList, value);
    state.currencyList.splice(state.currencyList.findIndex(s => s.symbol === value), 1);
  },
  [SET_DEFAULT_CURRENCY]: (state, value) => {
    state.currencyList = value;
  },
};
