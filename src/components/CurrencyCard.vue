<template>
  <div 
    class="coin-box" 
    @click.stop="openDetails"
  >
    <div class="row no-gutters coin-info">
      <div class="col-7">
        <div class="font-weight-bold">
          {{ info.name }}
        </div>
        <div class="row no-gutters mt-1">
          <div class="box-icon">
            <span :style="{ backgroundImage : 'url('+ iconbase +')' }" />
          </div>
          <div class="col text-left">
            <div><b>{{ info.base }}</b>/{{ info.quote }}</div>
            <div 
              v-if="ticker.price" 
              class="coin-price"
            >
              {{ ticker.price || '' }}<span style="font-size: x-small; font-weight: 700; padding-left: 3px;">{{ info.quote }}</span>
            </div>
          </div>
        </div>
      </div>
      <div 
        v-if="ticker.price" 
        :class="[(ticker.percent < 0)?'down':'up', 'col-5','text-right']"
      >
        <div class="coin-per">
          <span class="indicator" /><span>{{ ticker.percent }}%</span>
        </div>
        <div class="coin-chg">
          {{ parseFloat(ticker.chg).toFixed((info.quote === 'USDT') ? 3 : 8) }}
        </div>
        <div><span class="text-secondary">Vol:</span> <span class="text-dark">{{ ticker.vol }}</span></div>
      </div>
      <div 
        v-click-outside="closeDropDown" 
        :class="[{'show': showDropDown}]" 
        class="dd-container"
      >
        <span 
          role="button" 
          class="menu-btn" 
          @click.stop="onDropDown"
        >
          <i 
            class="fa fa-ellipsis-v" 
            aria-hidden="true"
          />
        </span>
        <div 
          v-if="showDropDown" 
          class="dd-menu"
        >
          <span 
            class="dd-item" 
            @click="openDetails"
          >Open</span>
          <span 
            class="dd-item" 
            @click="removeCard"
          >Delete</span>
        </div>
      </div>
    </div>
    <div 
      v-if="ticker.price" 
      class="sparkline-chart"
    >
      <Sparkline 
        :cdata="ticker.price" 
        :width="380" 
        :height="90"
      />
    </div>
  </div>
</template>
<script>
import Sparkline from './Sparkline.vue';
import { unSubscribeSymbol } from '../services/binance';
export default {
  components: {
    Sparkline,
  },
  props: {
    ticker: {
      type: Object,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDropDown: false,
      iconbase: 'https://raw.githubusercontent.com/rainner/binance-watch/master/public/images/icons/' + this.info.base.toLowerCase() + '_.png',
    };
  },
  methods: {
    onDropDown() {
      this.showDropDown = true;
    },
    removeCard() {
      this.showDropDown = false;
      unSubscribeSymbol(this.info.symbol);
      this.$store.dispatch('REMOVE_COIN_PAIR', this.info.symbol);
    },
    openDetails() {
      this.showDropDown = false;
      this.$router.push({ name: 'infoview', params: { 'symbol': this.info.symbol }});
    },
    closeDropDown() {
      this.showDropDown = false;
    },
  },
};
</script>