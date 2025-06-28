<template>
  <div class="geral-container">
    <div class="options">
      <!-- Cada escolha -->
      <div
        v-for="(option, index) in options"
        :key="index"
        class="card"
      >
        <h3 class="card-title">{{ option.title }}</h3>
        <div class="card-icon">
          <i :class="option.icon" aria-hidden="true"></i>
        </div>
        <p class="card-description">{{ option.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Geral",
  data() {
    return {
      // As opções ou sessões da tela inicial
      options: [
        {
          title: "Automações",
          icon: "fas fa-cogs", // Ícone correspondente (Font Awesome)
          description: "Defina um novo item de configuração para ser gerenciado pela Engenheira Virtual de Agências.",
        },
        {
          title: "SubAutomações",
          icon: "fas fa-chart-bar", // Ícone correspondente (Font Awesome)
          description: "Descrição da segunda sessão.",
        },
        {
          title: "SubAutomações por Automação",
          icon: "fas fa-chart-bar", // Ícone correspondente (Font Awesome)
          description: "Descrição da segunda sessão.",
        },
        {
          title: "Análises",
          icon: "fas fa-user-friends", // Ícone correspondente (Font Awesome)
          description: "Descrição da terceira sessão.",
        },
        {
          title: "Comandos",
          icon: "fas fa-tools", // Ícone correspondente (Font Awesome)
          description: "Descrição da quarta sessão.",
        },
        {
          title: "Comandos por Análise",
          icon: "fas fa-cogs", // Ícone correspondente (Font Awesome)
          description: "Descrição da primeira sessão.",
        },
        {
          title: "Versionamento de Análises",
          icon: "fas fa-user-friends", // Ícone correspondente (Font Awesome)
          description: "Descrição da terceira sessão.",
        },
        {
          title: "Versionamento de Comandos",
          icon: "fas fa-tools", // Ícone correspondente (Font Awesome)
          description: "Descrição da quarta sessão.",
        },
        {
          title: "Fabricantes",
          icon: "fas fa-user-friends", // Ícone correspondente (Font Awesome)
          description: "Fabricantes de Equipamentos gerenciados pelas Automações.",
        },
        {
          title: "Status de Execução",
          icon: "fas fa-tools", // Ícone correspondente (Font Awesome)
          description: "Defina status para as coletas de execução de Automações, Análises e Comandos)"
        },
        {
          title: "Tipos de Script",
          icon: "fas fa-cogs", // Ícone correspondente (Font Awesome)
          description: "Defina novos tipos de comando para serem utilizados nas Automações",
        },
        {
          title: "Ações de Template",
          icon: "fas fa-user-friends", // Ícone correspondente (Font Awesome)
          description: "Descrição da terceira sessão.",
        },
        {
          title: "Autenticação de Equipamentos",
          icon: "fas fa-tools", // Ícone correspondente (Font Awesome)
          description: "Defina acessos criptografados para os equipamentos gerenciados por Automação.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Configuração global */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.geral-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh; /* Ocupa toda a altura da tela */
  background-color:rgb(233, 233, 233); /* Cinza claro (fundo geral da tela) */
}

/* Layout das opções */
.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Layout responsivo */
  gap: 20px;
  width: 100%;
  max-width: 1600px; /* Define um limite máximo para o grid */
}

/* Estilos de cada card */
.card {
  background-color: #ffffff; /* Fundo branco das divs */
  border: 1px solid #e0e0e0; /* Borda cinza clara */
  border-radius: 4px; /* Canto levemente arredondado */
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Leve sombreamento */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-align: center;
}

/* Interatividade no hover */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Nome da sessão */
.card-title {
  margin: 10px 0;
  font-size: 22px;
  font-weight: bold;
  color: #333333;
}

/* Ícone */
.card-icon {
  font-size: 80px; /* Tamanho maior para destacar */
  color: #666666; /* Cor dos ícones */
  margin: 20px 0;
}

/* Descrição */
.card-description {
  font-size: 16px;
  color: #666666;
}
</style>