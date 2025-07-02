<template>
  <div class="page-container">
    <!-- Container geral -->
    <div class="automacoes-container">
        
    <!-- Container da tabela -->
    <div class="table-wrapper">
            <!-- Header com título e botão -->
        <div class="header">
            <h2 class="page-title">{{ currentPage }}</h2>
            <button class="btn-create" @click="openModal('create')">Criar Automação</button>
        </div>
        <table class="automacoes-table">
          <thead>
            <tr>
              <th>Ativo</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(automacao, index) in automacoes" :key="index">
              <td>
                <!-- Indicador de status ativo/inativo -->
                <span
                  class="status-indicator"
                  :class="{ active: automacao.ativo, inactive: !automacao.ativo }"
                ></span>
              </td>
              <td>{{ automacao.nome }}</td>
              <td>{{ automacao.descricao }}</td>
              <td class="actions-cell">
                <!-- Ícones de ações -->
                <i
                  class="fa fa-search action-icon"
                  title="Ver Detalhes"
                  @click="goToDetail(index)"
                ></i>
                <i
                  class="fa fa-pencil action-icon"
                  title="Editar"
                  @click="openModal('edit', index)"
                ></i>
                <i
                  class="fa fa-trash action-icon"
                  title="Excluir"
                  @click="deleteAutomacao(index)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal para criação/edição -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h3>{{ modalType === 'create' ? 'Criar Automação' : 'Editar Automação' }}</h3>
          <form @submit.prevent="handleSave">
            <div class="form-group">
              <label for="nome">Nome:</label>
              <input
                id="nome"
                type="text"
                v-model="formData.nome"
                placeholder="Digite o nome da automação"
                required
              />
            </div>
            <div class="form-group">
              <label for="descricao">Descrição:</label>
              <textarea
                id="descricao"
                v-model="formData.descricao"
                placeholder="Digite a descrição da automação"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label for="ativo">Ativo:</label>
              <select id="ativo" v-model="formData.ativo">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
            <div class="modal-buttons">
              <button type="submit" class="btn-save">Salvar</button>
              <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Automacoes",
  data() {
    return {
      // Lista de automações (dados de exemplo)
      automacoes: [
        { nome: "Automação 1", descricao: "Descrição da Automação 1", ativo: true },
        { nome: "Automação 2", descricao: "Descrição da Automação 2", ativo: false },
      ],
      // Controle do modal
      isModalOpen: false,
      modalType: "create", // 'create' ou 'edit'
      editIndex: null,
      // Dados do formulário
      formData: {
        nome: "",
        descricao: "",
        ativo: true,
      },
    };
  },
  computed: {
    // Obtém o título da página atual
    currentPage() {
      return this.$route.meta.title || "Página"; // Fallback caso não haja título definido
    },
  },
  methods: {
    openModal(type, index = null) {
      this.modalType = type;
      this.isModalOpen = true;
      if (type === "edit" && index !== null) {
        this.editIndex = index;
        this.formData = { ...this.automacoes[index] };
      } else {
        this.resetForm();
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = { nome: "", descricao: "", ativo: true };
      this.editIndex = null;
    },
    handleSave() {
      if (this.modalType === "create") {
        this.automacoes.push({ ...this.formData });
      } else if (this.modalType === "edit" && this.editIndex !== null) {
        this.automacoes.splice(this.editIndex, 1, { ...this.formData });
      }
      this.closeModal();
    },
    deleteAutomacao(index) {
      if (confirm("Tem certeza de que deseja excluir esta automação?")) {
        this.automacoes.splice(index, 1);
      }
    },
    goToDetail(index) {
      const automacao = this.automacoes[index];
      this.$router.push({ name: "DetalheAutomacao", params: { id: index, data: automacao } });
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Container principal */
.automacoes-container {
  max-width: 1200px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Header estilizado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.btn-create {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
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
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

.automacoes-table {
  width: 100%;
  border-collapse: collapse;
}

.automacoes-table th,
.automacoes-table td {
  padding: 12px 15px;
}

.automacoes-table thead th {
  background-color: #f9f9f9;
  font-weight: 600;
  color: #444;
}

/* Indicadores de ativo/inativo */
.status-indicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-indicator.active {
  background-color: #28a745;
}

.status-indicator.inactive {
  background-color: #6c757d;
}

/* Ações na célula de botões/ícones */
.actions-cell {
  display: flex; /* Layout flexível */
  gap: 15px; /* Espaçamento uniforme entre os ícones */
  justify-content: center; /* Centraliza os ícones na célula */
  align-items: center; /* Alinha verticalmente ao centro */
  padding: 5px 0; /* Adiciona espaçamento opcional na célula */
}

/* Ícones na célula de ações */
.action-icon {
  color: #003366; /* Azul escuro para os ícones */
  font-size: 1.2rem; /* Tamanho dos ícones */
  cursor: pointer; /* Mostra o cursor de clique */
  transition: all 0.3s ease; /* Animação no hover */
}

.action-icon:hover {
  color: #0056b3; /* Azul mais vibrante no hover */
  transform: scale(1.1); /* Leve ampliação no hover */
}

</style>
