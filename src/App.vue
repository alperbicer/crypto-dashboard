<template>
  <div id="app">
    <LayoutPage />
  </div>
</template>
<script>
import LayoutPage from './layout/LayoutPage.vue';
export default {
  components: {
    LayoutPage,
  },
  // created() {
  //   if (this.$workbox) {
  //     this.$workbox.addEventListener('waiting', () => {
  //       this.showUpgradeUI = true;
  //     });
  //   }
  // },
  // methods: {
  //   async accept() {
  //     this.showUpgradeUI = false;
  //     await this.$workbox.messageSW({ type: 'SKIP_WAITING' });
  //   },
  // },
};
</script>
