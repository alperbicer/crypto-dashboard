<template>
  <div class="container-fluid">
    <div class="row flex-xl-nowrap">
      <div class="col">
        <div class="row">
          <div class="col-md-8 mb-3">
            <div class="info-card">
              <div class="row">
                <div class="col">
                  <span 
                    :style="{ backgroundImage : `url('https://raw.githubusercontent.com/rainner/binance-watch/master/public/images/icons/${currency.base.toLowerCase()}_.png')` }" 
                    class="coin-img"
                  />
                  <div class="coin-name">
                    {{ currency.name }} ({{ currency.base }}) / <span class="small">{{ currency.quote }}</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <span 
                    :style="{'color': (ticker.pchg && ticker.pchg > 0) ? 'green':'red'}" 
                    class="price"
                  >{{ ticker.price }}<span class="x-small"> {{ currency.quote }}</span></span>
                </div>
                <div 
                  :class="[(ticker.percent < 0)?'down':'up']" 
                  class="col-md-6 chg-block"
                >
                  <div class="text-dark small text-right">
                    24h Chg
                  </div>
                  <div class="text-right d-flex justify-content-end">
                    <span class="indicator" /><span>{{ ticker.percent }}%</span>
                  </div>
                  <div class="icon-chg text-right">
                    {{ parseFloat(ticker.chg).toFixed((currency.quote === 'USDT') ? 3 : 8) }} <span class="x-small">{{ currency.quote }}</span>
                  </div>
                </div>
                <div class="col-12 x-small">
                  {{ ticker.time | timeformat }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="info-card justify-content-center">
              <div><span class="info-label">24H OPEN  </span>{{ ticker.open | priceformat }}<span class="small"> {{ currency.quote }}</span></div>
              <div><span class="info-label">24H HIGH  </span>{{ ticker.high | priceformat }}<span class="small"> {{ currency.quote }}</span></div>
              <div><span class="info-label">24H LOW  </span>{{ ticker.low | priceformat }}<span class="small"> {{ currency.quote }}</span></div>
              <div><span class="info-label">24H VOL  </span>{{ ticker.vol }}<span class="small"> {{ currency.base }}</span></div>
            </div>
          </div>
          <div class="col-12 mb-3">
            <coin-charts :symbol="symbol" />
          </div>
        </div>
      </div>
      <div class="col news-section">
        <crypto-news />
      </div>
    </div>
  </div>
</template>
<script>
import CryptoNews from '../components/CryptoNews.vue';
import CoinCharts from '../components/CoinCharts.vue';
import { subscribeSymbol } from '../services/binance';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export default {
  name: 'InfoView',
  filters: {
    priceformat: (value) => {
      if (!value) return '';
      return parseFloat(value).toLocaleString();
    },
    timeformat: (value) => {
      if (!value) return '';
      const dt = new Date(value);
      return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.toTimeString().split(' ')[0]}`;
    },
  },
  components: {
    CryptoNews,
    CoinCharts,
  },
  props: {
    symbol: {
      type: String,
      required: true,
    },
  },
  computed: {
    currency() {
      return this.$store.getters.getSymbolById(this.symbol) || {};
    },
    ticker() {
      return this.$store.getters.getTickerById(this.symbol) || {};
    },
  },
  mounted() {
    subscribeSymbol(this.symbol);
  },
};
</script>
