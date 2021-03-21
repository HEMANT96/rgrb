/*!

 =========================================================
 * Vue Black Dashboard PRO - v1.2.3
 =========================================================

 * Product Page: https://www.creative-tim.com/product/vue-black-dashboard-pro
 * Copyright 2019 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import RouterPrefetch from 'vue-router-prefetch'
import DashboardPlugin from './plugins/dashboard-plugin';
import APIService from './plugins/api-service'
import App from './App.vue';

// router setup
import router from './routes/router';
import i18n from './i18n';
import './registerServiceWorker'
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(APIService);

import Toasted from 'vue-toasted';
Vue.use(Toasted)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  i18n
});
