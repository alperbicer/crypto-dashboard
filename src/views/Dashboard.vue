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
        <font-awesome-icon
          icon="plus"
          size="lg"
        />
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
      const currencyList = this.currencyList.length > 0 ? this.currencyList : defaultPair;
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
<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;
  margin-top: -10px;
  .menu-bar {
    position: fixed;
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    padding: 0 20px;
    z-index: 50;
    background-color: #333;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.42);
    #base {
      width: 342px;
    }
    #quote {
      width: 100px;
      margin-left: 10px;
    }
    .v-select {
      .dropdown-menu {
        min-width: 100px !important;
        overflow-y: auto !important;
      }
    } 
    .slash {
      color: $primary;
      font-size: xx-large;
      font-weight: bold;
      padding-left: 10px;
    }
    .add-btn {
      width: 30px;
      height: 30px;
      padding: 0;
      background: transparent;
      border: 2px solid $primary;
      position: relative;
      cursor: pointer;
      display: inline-block;
      margin: 10px;
      color: $primary;
      border-radius: 50%;
      box-shadow: 4px 4px 20px #060606;
      font-size:12px;
      i {
        font-size: 1.6em;
        line-height: 1.6em;
        text-shadow: 2px 2px 3px rgb(6, 6, 6);
      }
      &:active{
        box-shadow: none;
      }
    }
  }
}
.vs1__combobox {
  background: #fff;
}
</style>