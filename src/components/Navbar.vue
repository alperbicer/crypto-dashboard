<template>
  <header class="page-header">
    <button
      class="back-btn"
      @click="$router.push({ path: '/' })"
    >
      <font-awesome-icon
        v-if="currentPage === 'infoview'"
        icon="angle-left"
        size="2x"
      />
    </button>
    <span
      class="page-title"
      @click="$router.push({ path: '/' })"
    >CRYPTO MAP DASHBOARD</span>
    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto" />
      <ul class="navbar-nav ml-auto">
        <template v-if="user.loggedIn">
          <div class="nav-item">
            {{ user.data.displayName }}
          </div>
          <li class="nav-item">
            <a
              class="nav-link"
              @click.prevent="signOut"
            >Sign out</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              to="login"
              class="nav-link"
            >
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="register"
              class="nav-link"
            >
              Register
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';
export default {
  data() {
    return {
      currentPage: 'dashboard',
    };
  },
  computed: {
    ...mapGetters({
      user: 'user',
    }),
  },
  watch: {
    '$route': {
      deep: true,
      handler: function (page) {
        this.currentPage = page.name;
      },
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: 'dashboard',
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  background-color: $primary;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  text-align: center;
  height: 50px;
  line-height: 50px;
  z-index: 100;
  box-shadow: 0 6px 7px 0 rgba(0, 0, 0, 0.45);
  transition: left .3s ease;
  .back-btn {
    background-color: transparent;
    padding: 0 20px;
    margin: -1px 0;
    border: none;
    z-index: 999;
    left: 0;
    &:focus {
      outline: none;
    }
    i {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .page-title {
    font-size: 25px;
    font-weight: bold;
    position: absolute;
    left: 0;
    right: 0;
  }
  .credential {
    display: flex;
    margin-right: 15px;
    font-size: 16px;
    font-weight: bold;
    z-index: 999;
    .nav-item {
      margin-right: 10px;
      .nav-link {
        color: black;
      }
    }
  }
}
</style>