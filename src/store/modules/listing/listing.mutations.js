import Vue from 'vue';
import { ADD_COIN_PAIR, UPDATE_TICKER, REMOVE_COIN_PAIR, SET_DEFAULT_CURRENCY } from './listing.types';
export default {
  [UPDATE_TICKER]: (state, payload) => {
    const tick = state.tickerList[payload.symbol];
    payload.pchg = tick ? (payload.price > tick.price ? 1 : -1) : 1;
    Vue.set(state.tickerList, payload.symbol, payload);
  },
  [ADD_COIN_PAIR]: (state, payload) => {
    if (!state.tickerList[payload.symbol]) {
      state.currencyList.push(payload);
      localStorage.setItem('vue-crypto-currency-new', JSON.stringify(state.currencyList));
    }
    Vue.set(state.tickerList, payload.symbol, { pchg: 1 });
  },
  [REMOVE_COIN_PAIR]: (state, symbol) => {
    Vue.delete(state.tickerList, symbol);
    state.currencyList.splice(state.currencyList.findIndex(s => s.symbol === symbol), 1);
    localStorage.setItem('vue-crypto-currency-new', JSON.stringify(state.currencyList));
  },
  [SET_DEFAULT_CURRENCY]: (state, payload) => {
    state.currencyList = payload;
  },
};
