<template>
  <div class="content-box">
    <div class="menu-bar">
      <v-select 
        id="base"
        v-model="baseCurrency"
        placeholder="Select Token"
        :options="coinList[quote]" 
        :clearable="false" 
      />
      <span class="slash">/</span>
      <v-select 
        id="quote" 
        v-model="quote" 
        :options="quoteOptions" 
        :searchable="false" 
        :clearable="false" 
        style="width: 100px" 
        @input="resetBase"
      />
      <button 
        class="add-btn" 
        @click="addCoinPair"
      >
        <i 
          class="fa fa-plus fa-lg" 
          aria-hidden="true"
        />
      </button>
    </div>
    <CryptoBoard />
  </div>
</template>
<script>
import coinList from '@/assets/group.json';
import { isEmpty } from '../utils/utility';
import defaultPair from '@/assets/defaultpair.json';
import { subscribeSymbol } from '../services/binance';
import { mapState } from 'vuex';
export default {
  name: 'Dashboard',
  components: {
    'v-select': () => import('vue-select'),
    CryptoBoard: () => import('@/views/CryptoBoard.vue'),
  },
  data() {
    return {
      coinList: coinList,
      quote: 'BNB',
      quoteOptions: ['BNB', 'BTC', 'ETH', 'USDT'],
      baseCurrency: {},
    };
  },
  computed: {
    ...mapState({
      currencyList: state => state.listing.currencyList,
    }),
  },
  created() {
    this.setDefaultCurrency();
  },
  mounted(){
    if (this.currencyList) {
      this.currencyList.forEach(currency => {
        subscribeSymbol(currency.symbol);
      });
    }
  },
  methods: {
    setDefaultCurrency() {
      const currencyList = this.currencyList || defaultPair;
      this.$store.dispatch('SET_DEFAULT_CURRENCY', currencyList);
    },
    resetBase() {
      this.baseCurrency = {};
    },
    addCoinPair() {
      if (!isEmpty(this.baseCurrency)){
        const symbol = `${this.baseCurrency.value}${this.quote}`;
        subscribeSymbol(symbol);
        this.$store.dispatch('ADD_COIN_PAIR', { 'symbol': symbol, 'base': this.baseCurrency.value, 'quote': this.quote, 'name': this.baseCurrency.name });
      }
    },
  },
};
</script>
<style lang="scss">
.vs1__combobox {
  background: #fff;
}
</style>