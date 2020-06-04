<template>
  <div class="layout-container">
    <header class="page-header bg-primary">
      <button 
        v-if="currentPage === 'infoview'" 
        class="back-btn" 
        @click="$router.push({ path: '/' })"
      >
        <i class="fa fa-angle-left fa-2x" />
      </button>
      <span class="page-title">CRYPTO MAP DASHBOARD</span>
    </header>
    <div class="page-container">
      <transition 
        name="fade" 
        mode="out-in"
      >
        <keep-alive include="dashboard">
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutPage',
  data() {
    return {
      currentPage: 'dashboard',
    };
  },
  watch: {
    '$route': {
      deep: true,
      handler: function (page) {
        this.currentPage = page.name;
      },
    },
  },
};
</script>