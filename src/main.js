import Vue from 'vue';
import App from './App.vue';
import * as firebase from 'firebase';
import router from './router';
import store from './store';
import wb from './registerServiceWorker';
import clickOutside from './directives/click-ouside';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV, faAngleLeft, faPlus, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEllipsisV, faAngleLeft, faPlus, faArrowDown, faArrowUp);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.prototype.$workbox = wb;
const configOptions = {
  apiKey: 'AIzaSyAiucsj8JCFKjMG93o4KbupLkXWqI6soSE',
  authDomain: 'crypto-map-dashboard.firebaseapp.com',
  databaseURL: 'https://crypto-map-dashboard.firebaseio.com',
  projectId: 'crypto-map-dashboard',
  storageBucket: 'crypto-map-dashboard.appspot.com',
  messagingSenderId: '203041574173',
  appId: '1:203041574173:web:38ab7f17efc355611425f4',
  measurementId: 'G-R7PTKMSTER',
};
firebase.initializeApp(configOptions);
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('FETCH_USER', user);
});
Vue.directive('click-outside', clickOutside);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
