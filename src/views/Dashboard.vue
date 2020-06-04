<template>
  <div class="content-box">
    <div class="menu-bar">
      <v-select 
        id="base" 
        v-model="baseCurrency" 
        :options="currencyList[quote]" 
        :clearable="false" 
        placeholder="Select Token"
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
import vSelect from 'vue-select';
import coins from '@/assets/group.json';
import CryptoBoard from '@/views/CryptoBoard.vue';
import { isEmpty } from '../util/Utility';
import { subscribeSymbol } from '../services/binance';
import { mapState } from 'vuex';
export default {
  name: 'Dashboard',
  components: {
    vSelect,
    CryptoBoard,
  },
  data() {
    return {
      currencyList: coins,
      quote: 'BNB',
      quoteOptions: ['BNB', 'BTC', 'ETH', 'USDT'],
      baseCurrency: {},
    };
  },
  computed: {
    ...mapState(['currencies']),
  },
  mounted(){
    if (this.currencies) {
      this.currencies.forEach(currency => {
        subscribeSymbol(currency.symbol);
      });
    }
  },
  methods: {
    resetBase() {
      this.baseCurrency = {};
    },
    addCoinPair() {
      if (!isEmpty(this.baseCurrency)){
        const symbol = `${this.baseCurrency.value}${this.quote}`;
        subscribeSymbol(symbol);
        this.$store.commit('ADD_COIN_PAIR', { 'symbol': symbol, 'base': this.baseCurrency.value, 'quote': this.quote, 'name': this.baseCurrency.name });
      }
    },
  },
};
</script>