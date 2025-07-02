import Vue from 'vue';
import Router from 'vue-router';
import GestaoConfiguracao from './views/GestaoConfiguracao.vue';
import Automacoes from './views/Automacoes.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "/gestao_configuracao",
      component: GestaoConfiguracao,
      meta: { 
        title: "EVA | Gestão de Configuração" 
      } 
    },
    // { path: "/coletas", component: Coletas, meta: { title: "EVA | Coletas" } },
    // { path: "/dashboards", component: Dashboards, meta: { title: "EVA | Dashboards" } },
    // { path: "/saude", component: Saude, meta: { title: "EVA | Saúde" } },
    // { path: "/acessos", component: Acessos, meta: { title: "EVA | Acessos" } }
    { path: "/automacoes", component: Automacoes, meta: { title: "Automações" } },
    // { path: "/subautomacoes", component: SubAutomacoes, meta: { title: "SubAutomações" } },
    // { path: "/analises", component: Analises, meta: { title: "Análises" } },
  ],
});

router.beforeEach((to, from, next) => {
  // Verifica se a rota atual tem um meta.title definido
  if (to.meta && to.meta.title) {
    document.title = to.meta.title; // Atualiza o título do navegador
  } else {
    document.title = "Engenheira Virtual de Agências"; // Título padrão (fallback)
  }
  next(); // Continua para a rota
});

export default router;