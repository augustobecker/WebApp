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

        <!-- Condicional para usar imagem ou ícone com classes -->
        <div class="card-icon">
          <template v-if="option.icon.endsWith('.png') || option.icon.endsWith('.jpg') || option.icon.endsWith('.svg')">
            <!-- Para imagens de arquivos -->
            <img :src="`/icons/${option.icon}`" :alt="option.title" />
          </template>
          <template v-else>
            <!-- Para ícones Font Awesome ou outras classes -->
            <i :class="option.icon" aria-hidden="true"></i>
          </template>
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
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie Automações.",
        },
        {
          title: "SubAutomações",
          icon: "subautomacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie módulos de uma Automação.",
        },
        {
          title: "SubAutomações por Automação",
          icon: "subautomacoes-por-automacao.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie quais módulos compõem cada Automação.",
        },
        {
          title: "Análises",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie análises para validação de cada módulo da Automação.",
        },
        {
          title: "Comandos",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie os comandos utilizados para análise e validação de cada módulo da Automação.",
        },
        {
          title: "Comandos por Análise",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie quais comandos compõem cada Análise.",
        },
        {
          title: "Versionamento de Análises",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie diferentes versões de Análises.",
        },
        {
          title: "Versionamento de Comandos",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie diferentes versões de Comandos.",
        },
        {
          title: "Fabricantes",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie diferentes Fabricantes de Equipamentos gerenciados pelas Automações.",
        },
        {
          title: "Status de Execução",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie tipos de status para as coletas de execução."
        },
        {
          title: "Tipos de Script",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie tipos diferentes de comando para serem utilizados nas Automações",
        },
        {
          title: "Ações de Template",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre ações a serem tomadas por Templates quando aplicados.",
        },
        {
          title: "Autenticação de Equipamentos",
          icon: "automacoes.png", // Ícone correspondente (Font Awesome)
          description: "Cadastre e gerencie acessos criptografados para os equipamentos gerenciados por Automação.",
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Dinâmica de colunas */
  grid-auto-rows: 1fr; /* Garante que a altura das linhas seja uniforme */
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
}

/* Cada card */
.card {
  background-color: #ffffff; /* Fundo branco */
  border: 1px solid #e0e0e0; /* Borda cinza */
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  /* Transições suaves */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra leve */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Efeito hover no card */
.card:hover {
  transform: translateY(-5px); /* Efeito de elevação */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra mais visível */
  border: 3px solid #003366; /* Borda cinza */
}

.card:hover .card-title {
  color: #003366; /* Altere para a cor desejada */
  font-weight: bold; /* Torna o texto mais destacado */
  transition: color 0.3s ease; /* Transição suave ao mudar a cor */
}

.card:hover .card-description {
  color: #003366; /* Altere para a cor desejada */
  font-weight: bold; /* Torna o texto mais destacado */
  transition: color 0.3s ease; /* Transição suave ao mudar a cor */
}

/* Título do card */
.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}

/* Ícone do card */
.card-icon {
  display: flex;
  align-items: center; /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */
}

/* Ajuste dinâmico do ícone como imagem */
.card-icon img {
  max-width: 85%; /* Reduz o tamanho da imagem proporcionalmente ao card */
  max-height: 85%; /* Impede que o ícone ultrapasse o container */
  object-fit: contain; /* Garante que a proporção original da imagem seja mantida */
}

/* Caso seja um ícone baseado em classes (ex. Font Awesome) */
.card-icon i {
  font-size: 6vw; /* Escala proporcional ao tamanho da largura da tela */
  color: #666666;
}

/* Descrição do card */
.card-description {
  font-size: 14px;
  color: #666666;
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