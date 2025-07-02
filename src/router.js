import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Geral from './views/Geral.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/geral',
      name: 'Geral',
      component: Geral,
      meta: {
        title: "Overall"
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  // Verifica se a rota atual tem um meta.title definido
  if (to.meta && to.meta.title) {
    document.title = to.meta.title; // Atualiza o título do navegador
  } else {
    document.title = "Minha Aplicação"; // Título padrão (fallback)
  }
  next(); // Continua para a rota
});

export default router;