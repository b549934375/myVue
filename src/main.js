import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import routerConfig from './router.config.js';

/* eslint-disable no-new */
const router = new VueRouter(routerConfig);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
