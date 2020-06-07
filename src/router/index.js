import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    },
    {
      path: '/view/:symbol',
      name: 'infoview',
      component: () => import(/* webpackChunkName: "InfoView" */ '../views/InfoView.vue'),
      props: true,
    },
  ],
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;