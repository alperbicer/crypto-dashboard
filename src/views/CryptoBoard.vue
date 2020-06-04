<template>
  <div class="board">
    <div 
      v-for="(value, index) in currencies" 
      :key="index" 
      class="card-block">
      <CurrencyCard 
        :ticker="tickers[value.symbol] || {}" 
        :info="value" />
    </div>
  </div>
</template>
<script>
import CurrencyCard from '../components/CurrencyCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'CryptoBoard',
  components: {
    CurrencyCard,
  },
  computed: {
    ...mapState(['tickers', 'currencies']),
  },
}
</script>