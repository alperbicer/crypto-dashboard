<template>
  <div class="board">
    <div 
      v-for="(value, index) in currencyList" 
      :key="index" 
      class="card-block"
    >
      <CurrencyCard 
        :ticker="tickerList[value.symbol] || {}" 
        :info="value"
      />
    </div>
  </div>
</template>
<script>
import CurrencyCard from '../components/CurrencyCard.vue';
import { mapState } from 'vuex';
export default {
  name: 'CryptoBoard',
  components: {
    CurrencyCard,
  },
  computed: {
    ...mapState({
      currencyList: state => state.listing.currencyList,
      tickerList: state => state.listing.tickerList,
    }),
  },
};
</script>