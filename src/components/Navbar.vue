<template>
  <div class="navbar-container">
    <!-- Navbar principal -->
    <nav class="navbar">
      <!-- Menu Hambúrguer -->
      <div class="navbar-left">
        <div class="navbar-toggle" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="navbar-product-name">{{ productName }}</span> <!-- Nome do produto -->
      </div>

      <!-- Página atual com combinação de menu -->
      <div class="navbar-title">
        {{ fullPageTitle }}
      </div>

      <!-- Ícones do canto direito -->
      <div class="navbar-icons">
        <i class="icon-search"></i>
        <i class="icon-help"></i>
        <i class="icon-notifications"></i>
      </div>
    </nav>

    <!-- Menu abaixo da navbar -->
    <ul class="submenu">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ active: selectedItem === index }"
        @click="redirectTo(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isMenuActive: false,
      productName: "Engenheira Virtual de Agências",
      menuItems: [
        { name: "Gestão de Configuração", route: "/gestao_configuracao" },
        { name: "Coletas", route: "/coletas" },
        { name: "Dashboards", route: "/dashboards" },
        { name: "Saúde", route: "/saude" },
        { name: "Acessos", route: "/acessos" },
      ],
      selectedItem: 0, // Índice do menu selecionado
    };
  },
  computed: {
    // Obtém o título da página atual
    currentPage() {
      return this.$route.meta.title || "Página"; // Fallback caso não haja título definido
    },
    // Combina o título da página com o texto do menu selecionado
    fullPageTitle() {
      return `${this.menuItems[this.selectedItem].name} | ${this.$route.meta.title}` ;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
    redirectTo(index) {
      this.selectedItem = index; // Atualiza o item selecionado
      this.$router.push(this.menuItems[index].route); // Redireciona para a rota definida
    },
  },
};
</script>

<style scoped>
/* Reset básico */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  border-bottom: 2px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 999;
}

/* Agrupamento do menu e nome do produto no canto esquerdo */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px; /* Espaçamento entre o menu hambúrguer e o nome do produto */
}

/* Menu Hambúrguer */
.navbar-toggle {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  margin-left: 20px;
}

.navbar-toggle .bar {
  width: 24px;
  height: 3px;
  background-color: #003366;
  border-radius: 2px;
}

/* Nome do Produto */
.navbar-product-name {
  font-size: 16px;
  font-weight: bold;
  color: #003366;
}

/* Título centralizado */
.navbar-title {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}

/* Ícones no canto direito da navbar */
.navbar-icons {
  display: flex;
  gap: 15px;
}

.navbar-icons i {
  font-size: 18px;
  color: #c0c0c0;
  cursor: pointer;
}

.navbar-icons i:hover {
  color: #003366;
}

/* Menu abaixo da navbar */
.submenu {
  display: flex;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 2px solid #e0e0e0;
}

.submenu li {
  padding: 10px 20px;
  font-size: 16px;
  color: #808080;
  cursor: pointer;
  border-bottom: 2px solid transparent; /* Borda para animação */
  transition: all 0.3s ease;
}

.submenu li.active {
  font-weight: bold;
  color: #000000;
  border-bottom: 2px solid #003366; /* Azul escuro */
}

.submenu li:hover {
  color: #003366;
}
</style>