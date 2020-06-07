<template>
  <div class="layout-container">
    <navbar />
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
import { mapGetters } from 'vuex';
import Navbar from '@/components/Navbar';
export default {
  name: 'LayoutPage',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
};
</script>
<style lang="scss" scoped>
.layout-container{ 
  height: 100%;
  width:100%;
  .page-container {
    width: 100%;
    height: 100%;
    padding-top:60px;
  }
}
</style>