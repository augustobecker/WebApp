<template>
  <div class="page-container">
    <!-- Container principal com limite de largura -->
    <div class="table-page-container">
      <!-- Cabeçalho com título e botão de criação -->
      
      <!-- Tabela com borda e fundo branco -->
      <div class="table-wrapper">
          <div class="header">
            <h2 class="page-title">{{ pageTitle }}</h2>
            <button v-if="showCreateButton" class="btn-create" @click="onCreate">
              {{ createButtonText }}
            </button>
          </div>
        <table class="data-table">
          <thead>
            <tr>
              <template v-for="(column, index) in tableColumns">
                <!-- Adicionamos uma coluna específica para status (Ativo) -->
                <th v-if="column === 'ativo'" :key="'ativo-' + index">
                  Ativo
                </th>
                <th v-else :key="index">
                  {{ column }}
                </th>
              </template>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <!-- Renderiza os dados dinamicamente -->
            <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
              <!-- Exibição do status como bolinhas -->
              <template v-for="(column, colIndex) in tableColumns">
                <td v-if="column === 'ativo'" :key="'ativo-' + colIndex">
                  <span
                    class="status-indicator"
                    :class="{ active: row[column], inactive: !row[column] }"
                  ></span>
                </td>
                <td v-else :key="colIndex">
                  {{ row[column] }}
                </td>
              </template>
              <!-- Coluna de ações -->
              <td class="actions-cell">
                <i
                  v-if="actions.view"
                  class="fa fa-search action-icon"
                  title="Ver"
                  @click="$emit('view', row, rowIndex)"
                ></i>
                <i
                  v-if="actions.edit"
                  class="fa fa-pencil action-icon"
                  title="Editar"
                  @click="$emit('edit', row, rowIndex)"
                ></i>
                <i
                  v-if="actions.delete"
                  class="fa fa-trash action-icon"
                  title="Excluir"
                  @click="$emit('delete', row, rowIndex)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePage",
  props: {
    pageTitle: {
      type: String,
      required: true,
    },
    tableColumns: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    showCreateButton: {
      type: Boolean,
      default: true,
    },
    createButtonText: {
      type: String,
      default: "Criar",
    },
    actions: {
      type: Object,
      default: () => ({
        view: true,
        edit: true,
        delete: true,
      }),
    },
  },
  methods: {
    onCreate() {
      this.$emit("create");
    },
  },
};
</script>

<style scoped>
/* Fundo geral da página */
.page-container {
  background-color: rgb(233, 233, 233); /* Fundo cinza claro */
  padding: 20px 0;
  min-height: 100vh;
}

/* Container principal */
.table-page-container {
  max-width: 1200px;
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

/* Header estilizado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.btn-create {
  background-color: #003366;
  color: white;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.btn-create:hover {
  background-color: #0056b3;
}

/* Tabela */
.table-wrapper {
  width: 100%;
  background-color: #ffffff; /* Fundo branco */
  border: 1px solid #e0e0e0; /* Borda cinza */
  border-radius: 3px;
  padding: 35px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 12px 15px;
}

.data-table th {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #444;
}

/* Indicadores de status ativo/inativo */
.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-indicator.active {
  background-color: #28a745; /* Verde: Ativo */
}

.status-indicator.inactive {
  background-color: #6c757d; /* Cinza: Inativo */
}

/* Ações */
.actions-cell {
  display: flex; /* Layout flexível */
  gap: 15px; /* Espaçamento uniforme entre os ícones */
  justify-content: center; /* Centraliza os ícones na célula */
  align-items: center; /* Alinha verticalmente ao centro */
  padding: 5px 0; /* Adiciona espaçamento opcional na célula */
}

.action-icon {
  font-size: 1.2rem;
  color: #003366;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
}

.action-icon:hover {
  color: #0056b3;
  transform: scale(1.1); /* Leve efeito de ampliação */
}

/* Responsividade */
@media (max-width: 768px) {
  .table-wrapper {
    padding: 10px;
  }

  .btn-create {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}
</style>