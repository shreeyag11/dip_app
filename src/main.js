import Vue from 'vue';
import Buefy from 'buefy';
import * as PIXI from 'pixi.js';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import lib from '../crate/Cargo.toml';

/* eslint-disable */
const myLib = {
  install: function(Vue, options) {
    lib.init();
    Vue.prototype.lib = lib;
    Vue.prototype.PIXI = PIXI;
  }
};
/* eslint-enable */

Vue.use(myLib);
Vue.use(Buefy);
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
