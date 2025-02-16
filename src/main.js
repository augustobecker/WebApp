import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false; // Desativa a mensagem de aviso no console durante a produção

new Vue({
  render: (h) => h(App),
                router
    }).$mount('#app');