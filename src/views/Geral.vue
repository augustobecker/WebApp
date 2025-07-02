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

/* Container geral */
.geral-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh; /* Preenche a altura total da tela */
  background-color: rgb(233, 233, 233); /* Fundo cinza */
}

/* Grid dos cards */
.options {
  display: grid;

  /* Adiciona espaçamento apropriado entre os cards */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Garante que os cards se ajustem corretamente */
  gap: 20px; /* Controla o espaçamento entre cards */
  
  padding: 20px; /* Espaçamento interno ao redor do grid */
  box-sizing: border-box; /* Inclui padding no cálculo do container */
  width: 100%; /* O grid ocupa toda a largura disponível */
  max-width: 1400px; /* Limita o tamanho máximo */
}

/* Cada card */
.card {
  background-color: #ffffff; /* Fundo branco */
  border: 1px solid #e0e0e0; /* Borda cinza */
  border-radius: 8px; /* Cantos arredondados */
  
  /* Adiciona padding interno contabilizado pelo box-sizing */
  padding: 20px; /* Espaçamento interno do card */
  
  box-sizing: border-box; /* Garante que padding seja incluído no tamanho total */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  /* Tamanhos proporcionais */
  aspect-ratio: 1; /* Garante que o card tenha formato quadrado */
  min-height: 250px; /* Tamanho mínimo do card */

  /* Transições suaves */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra leve */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Efeito hover no card */
.card:hover {
  transform: translateY(-5px); /* Efeito de elevação */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra mais visível */
}

/* Título do card */
.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin: 10px 0;
}

/* Ícone do card */
.card-icon {
  font-size: 70px; /* Destaque para o ícone */
  color: #666666;
  margin: 10px 0;
}

/* Descrição do card */
.card-description {
  font-size: 14px;
  color: #666666;
  margin-top: 10px;
}


/* ------ Responsividade Melhorada ------ */

/* Telas grandes (acima de 768px): Default. Nada muda aqui */

/* Faixa intermediária entre 766px e 708px */
@media (max-width: 766px) and (min-width: 709px) {
  .options {
    grid-template-columns: repeat(2, 1fr); /* Força duas colunas */
    gap: 20px; /* Espaçamento consistente */
  }
}

/* Telas médias, entre 708px e 595px */
@media (max-width: 708px) and (min-width: 596px) {
  .options {
    grid-template-columns: repeat(2, 1fr); /* Garante duas colunas sem compressão */
    gap: 20px; /* Espaçamento obedecido */
  }
}

/* Telas pequenas, entre 595px e 495px */
@media (max-width: 595px) and (min-width: 495px) {
  .options {
    grid-template-columns: repeat(1, 1fr); /* Força apenas uma coluna */
    gap: 15px; /* Espaçamento ajustado */
  }
}

/* Smartphones e telas menores */
@media (max-width: 495px) {
  .options {
    grid-template-columns: 1fr; /* Apenas uma coluna de cards */
    gap: 10px; /* Ajuste para telas muito pequenas */
    padding: 10px; /* Espaçamento interno menor */
  }
}
</style>