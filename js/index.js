import Vue from 'vue';
import Vuex from 'vuex';
import router from './router.js';
import store from './store.js';
import App from './App.vue';
import Buefy from 'buefy';

/* eslint-disable */
import("../pkg/index.js").then(lib => {
    const myLib = {
        install: function (Vue, options) {
            lib.init();
            Vue.prototype.lib = lib;
        }
    };

    Vue.use(myLib);
    Vue.use(Buefy);
    Vue.use(Vuex);
    Vue.config.productionTip = false;

    const app = new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount('#app');
});
/* eslint-enable */

