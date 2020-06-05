export default {
  getSymbolById: state => (symbol) => {
    return state.currencyList.find(s => s.symbol === symbol);
  },
  getTickerById: state => (symbol) => {
    return state.tickerList[symbol];
  },
};
