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
          <span class="indicator">
            <font-awesome-icon
              v-if="ticker.percent < 0"
              icon="arrow-down"
            />
            <font-awesome-icon
              v-else
              icon="arrow-up"
            />
          </span>
          <span>{{ ticker.percent }}%</span>
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
          <font-awesome-icon icon="ellipsis-v" />
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
<style lang="scss" scoped>
.coin-box {
  position: relative;
  width: 390px;
  height: 200px;
  background: #fff;
  border: 1px solid rgba(220, 220, 220, 0.58);
  box-shadow: 5px 5px 25px 0 rgba(46,61,73,.16);
  border-radius: 6px;
  padding: 0;
  transition: .5s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .coin-info {
    height: 212px;
    padding: 10px 20px 5px 15px;
    .box-icon {
      padding-right: 10px;
      span {
        display: block;
        height: 50px;
        width: 50px;
        background-position: 0 0;
        background-size: 100% 100%;
        box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.3), 0px -2px 12px 3px rgba(156, 156, 156, 0.1);
        border-radius: 50%;
        border: 2px solid #fff;
      }
    }
    .dd-container {
      position: absolute;
      top: 4px;
      right: 8px;
      cursor: pointer;
      transition: all .15s ease;
      &.show {
        animation: show-dropdown .25s ease forwards;
      }
      .menu-btn {
        color: #a8a8a8;
        &:hover {
          color: black
        }
      }
      .dd-menu {
        position: absolute;
        right: 0;
        top: 0;
        min-width: 160px;
        overflow: auto;
        z-index: 10;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        background-color: #fff;
        background-clip: padding-box;
        border-radius: 4px;
        box-shadow: 0 12px 50px rgba(50,50,93,.1), 0 0 15px rgba(0,0,0,.1);
        .dd-item{
          display: block;
          line-height: 1.5;
          padding: 3px 5px;
          clear: both;
          &:hover{
            background-color: #eaeaea;
          }
        }
      }
      @keyframes show-dropdown {
        0% {
          transition: visibility .25s,opacity .25s,transform .25s;
          transform: translate(0,10px) perspective(200px) rotateX(-2deg);
          opacity: 0
        }
        100% {
          transform: translate(0,0);
          opacity: 1
        }
      }
    }
  }
}
</style>