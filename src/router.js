import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Geral from './views/Geral.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/geral',
      name: 'Geral',
      component: Geral
    }
  ],
});