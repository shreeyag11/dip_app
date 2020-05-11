import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import ViewerPage from './views/ViewerPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/viewer',
    name: 'Viewer',
    component: ViewerPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: __webpack_public_path__,
  routes,
});

export default router;
