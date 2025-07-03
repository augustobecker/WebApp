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
            <!-- Ícone de fechar no canto superior direito -->
            <span class="modal-close" @click="closeModal">&times;</span>

            <!-- Título do modal -->
            <h3>{{ modalType === 'create' ? 'Criar Automação' : 'Editar Automação' }}</h3>
            
            <!-- Formulário -->
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
              
              <label for="estado">Estado:</label>
              <div class="radio-group">
                <!-- Opção Ativo -->
                <label for="ativo" class="radio-option">
                  <input
                    id="ativo"
                    name="estado"
                    type="radio"
                    :value="true"
                    v-model="formData.ativo"
                  />
                  <span class="custom-radio"></span>
                  Ativo
                </label>

                <!-- Opção Inativo -->
                <label for="inativo" class="radio-option">
                  <input
                    id="inativo"
                    name="estado"
                    type="radio"
                    :value="false"
                    v-model="formData.ativo"
                  />
                  <span class="custom-radio"></span>
                  Inativo
                </label>
              </div>

              <!-- Botão salvar maior e centralizado -->
              <div class="modal-buttons">
                <button type="submit" class="btn-save">Salvar</button>
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
  padding: 10px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.btn-create {
  background-color: #003366;
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

/* Estilo geral para o overlay do modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro translúcido */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Sobrepõe outros elementos */
}

/* Estilo do próprio modal */
.modal {
  position: relative; /* Necessário para posicionar o "X" */
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 20px 30px 25px; /* Adicionado espaçamento inferior para o botão */
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.3s ease-out;
}

/* Animação de fade-in no modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px); /* Modal "sobe" ao aparecer */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Título do modal */
.modal h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Formulário dentro do modal */
.modal form {
  display: flex;
  flex-direction: column;
  gap: 0px; /* Espaçamento entre os campos */
  text-align: left;
}

/* Contêiner do campo, garantindo espaço em volta */
.modal form .form-group {
  margin-bottom: 20px; /* Espaçamento entre os campos */
}

/* Label do campo, criando separação */
.modal form .form-group label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px; /* Espaço entre a label e o input */
  display: block; /* Coloca a label em uma linha separada */
  padding-left: 2px; /* Adiciona leve alinhamento lateral uniforme */
}

/* Campos de entrada (input, textarea, select) */
.modal form .form-group input,
.modal form .form-group textarea,
.modal form .form-group select {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  padding: 12px; /* Ajuste os valores do padding para maior conforto */
  border: 1px solid #ccc; /* Borda cinza */
  border-radius: 8px; /* Bordas suavemente arredondadas */
  width: 100%; /* Garante que o campo seja responsivo */
  transition: border 0.3s ease-in-out;
  box-sizing: border-box; /* Garante que padding é calculado no tamanho total */
}

/* Efeito em foco para campos */
.modal form .form-group input:focus,
.modal form .form-group textarea:focus,
.modal form .form-group select:focus {
  border-color: #007bff; /* Azul ao focar */
  outline: none; /* Remove o outline padrão */
}

/* Textarea com redimensionamento controlado */
.modal form .form-group textarea {
  resize: vertical; /* Apenas redimensionável na vertical */
  min-height: 100px; /* Altura mínima para o textarea */
}

/* Botões do modal */
.modal-buttons {
  display: flex;
  justify-content: space-between;
}

/* Botão de salvar */
/* Botão salvar centralizado e ocupando toda a largura */
.modal-buttons .btn-save {
  display: block; /* Garante que o botão seja considerado um bloco completo */
  width: 100%; /* Faz o botão ocupar toda a largura disponível */
  background-color: #003366; /* Cor de fundo verde */
  color: white; /* Texto branco */
  padding: 15px; /* Aumenta o tamanho vertical para destaque */
  font-size: 1.2rem; /* Tamanho da fonte maior */
  font-weight: bold; /* Deixa o texto mais chamativo */
  text-align: center; /* Centraliza o texto */
  cursor: pointer; /* Adiciona o ponteiro de clique */
  border: none; /* Remove bordas padrão */
  border-radius: 10px; /* Bordas arredondadas */
  transition: background-color 0.3s ease-in-out; /* Efeito suave de hover */
  margin-top: 10px;
}

/* Efeito ao passar o mouse */
.modal-buttons .btn-save:hover {
  background-color: #007bff; /* Verde mais escuro ao passar o mouse */
}

/* Ícone de fechar ("X") no canto superior direito */
.modal-close {
  position: absolute; /* Permite colocar o ícone fora do fluxo natural */
  top: 10px; /* Distância da parte superior do modal */
  right: 15px; /* Distância da lateral direita do modal */
  font-weight: bold;
  font-size: 25px; /* Tamanho maior, conforme solicitado */
  color: #333; /* Cor inicial */
  cursor: pointer; /* Mostra o cursor de clique */
  transition: color 0.3s ease; /* Suaviza a mudança de cor no hover */
}

/* Efeito no hover para destaque */
.modal-close:hover {
  color: red; /* Cor mais forte ao passar o mouse */
}

/* Estilo da div que contém os radio buttons */
.radio-group {
  display: flex; /* Exibe as opções lado a lado */
  gap: 20px; /* Espaçamento entre as bolinhas */
  align-items: center; /* Alinha verticalmente com o texto */
  margin-bottom: 15px;
}

/* Estilo geral para o "label" das opções */
.radio-option {
  display: flex; /* Flexbox para alinhar bolinha e texto */
  align-items: center; /* Centraliza a bolinha com o texto */
  cursor: pointer; /* Mostra cursor de clique */
  font-size: 1rem; /* Tamanho do texto */
  color: #333; /* Cor do texto */
  gap: 8px; /* Espaçamento entre bolinha e texto */
}

/* Esconde o input padrão (radio) */
.radio-option input[type="radio"] {
  display: none; /* Esconde o input padrão */
}

/* Estilo personalizado da bolinha (radio button) */
.radio-option .custom-radio {
  width: 16px; /* Largura da bolinha */
  height: 16px; /* Altura da bolinha */
  border: 2px solid #ccc; /* Borda da bolinha desmarcada */
  border-radius: 50%; /* Faz a bolinha ser totalmente circular */
  background-color: white; /* Fundo interno */
  transition: background-color 0.2s, border-color 0.2s ease;
}

/* Estilo para bolinha "marcada" */
/* Cor das opções quando selecionadas */
.radio-option input[type="radio"]:checked + .custom-radio {
  background-color: #28a745; /* Cor verde para Ativo */
  border-color: #28a745; /* Verde ao selecionar */
}

/* Texto personalizado (diferencia cores para ativo/inativo) */
.radio-option input[type="radio"]:checked + .custom-radio + span {
  color: #28a745; /* Verde para Ativo */
}

.radio-option input[type="radio"]:not(:checked) + .custom-radio + span {
  color: #6c757d; /* Cinza para Desmarcado/Inativo */
}

/* Inativo (quando não estiver selecionado) */
.radio-option input[type="radio"]:checked[value=false] + .custom-radio {
  background-color: #6c757d; /* Cinza para Inativo */
  border-color: #6c757d;
}

/* Responsividade do modal */
@media (max-width: 768px) {
  .modal {
    width: 95%; /* Ajusta o tamanho para telas menores */
    padding: 15px;
  }
}

</style>
