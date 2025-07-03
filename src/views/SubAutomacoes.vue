<template>
  <div>
    <!-- TablePage para SubAutomações -->
    <TablePage
      :pageTitle="'SubAutomações'"
      :tableColumns="['ativo', 'Nome', 'Descrição']"
      :tableData="subautomacoes"
      :createButtonText="'Criar SubAutomação'"
      :actions="{ view: true, edit: true, delete: true }"
      @create="openCreateModal"
      @edit="openEditModal"
      @delete="deleteSubautomacao"
      @view="viewSubautomacao"
    >
    </TablePage>
        <!-- Modal Personalizado -->
        <Modal
        :isOpen="isModalOpen"
        :title="modalType === 'create' ? 'Criar SubAutomação' : 'Editar SubAutomação'"
        @close="closeModal"
        @confirm="saveSubautomacao"
        >
        <form @submit.prevent="saveSubautomacao">
            <div>
            <label for="name">Nome:</label>
            <input
                id="name"
                type="text"
                v-model="formData.nome"
                placeholder="Digite o nome da SubAutomação"
                required
            />
            </div>

            <div>
            <label for="descricao">Descrição:</label>
            <textarea
                id="descricao"
                v-model="formData.descricao"
                placeholder="Digite a descrição da SubAutomação"
            ></textarea>
            </div>

            <!-- Campo para selecionar o estado ativo/inativo -->
            <div class="radio-group">
                <span>Estado:</span>
                <br>
                <label class="radio-option">
                <input
                    type="radio"
                    name="estado"
                    value="true"
                    v-model="formData.ativo"
                />
                <span class="custom-radio"></span>
                Ativo
                </label>
                <label class="radio-option">
                <input
                    type="radio"
                    name="estado"
                    value="false"
                    v-model="formData.ativo"
                />
                <span class="custom-radio"></span>
                Inativo
                </label>
            </div>
        </form>
        </Modal>
  </div>
</template>

<script>
import TablePage from "../components/TablePage.vue"; // Componente genérico reutilizável
import Modal from "../components/Modal.vue"

export default {
  name: "PageSubAutomacoes",
  components: {
    TablePage,
    Modal,
  },
  data() {
    return {
      // Dados da tabela de SubAutomações
      subautomacoes: [
        { ativo: true, Nome: "SubAutomação 1", Descrição: "Descrição 1" },
        { ativo: false, Nome: "SubAutomação 2", Descrição: "Descrição 2" },
      ],
      // Modal aberto ou não
      isModalOpen: false,
      modalType: "create", // Modal para "create" ou "edit"
      formData: {}, // Dados do formulário
    };
  },
    methods: {
    openCreateModal() {
        this.modalType = "create";
        this.formData = { nome: "", descricao: "", ativo: true}; // Reseta os dados
        this.isModalOpen = true;
    },
    openEditModal(row) {
        this.modalType = "edit";
        this.formData = { ...row }; // Preenche os dados para edição
        this.isModalOpen = true;
    },
    saveSubautomacao() {
        if (this.modalType === "create") {
        // Cria nova SubAutomação
        this.subautomacoes.push({ ...this.formData, Ativo: true });
        } else if (this.modalType === "edit") {
        // Atualiza SubAutomação existente
        const index = this.subautomacoes.findIndex(
            (item) => item.Nome === this.formData.Nome
        );
        if (index !== -1) {
            this.subautomacoes.splice(index, 1, this.formData);
        }
        }
        this.closeModal();
    },
    closeModal() {
        this.isModalOpen = false; // Fecha o modal
    },
    },
};
</script>