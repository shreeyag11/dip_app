import Vue from 'vue';
import Buefy from 'buefy';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import lib from '../crate/Cargo.toml';

const myLib = {
  install: function(Vue, options) {
    lib.init();
    Vue.prototype.$lib = lib;
  }
};

Vue.use(myLib);
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
