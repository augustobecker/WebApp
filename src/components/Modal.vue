<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Botão de Fechar -->
      <span class="modal-close" @click="close">&times;</span>

      <!-- Título do Modal -->
      <h2
        class="modal-title"
        :class="{ 'text-left': titleAlign === 'left', 'text-center': titleAlign === 'center', 'text-right': titleAlign === 'right' }"
      >
        {{ title }}
      </h2>

      <!-- Conteúdo do Modal -->
      <div class="modal-content">
        <slot>
          <!-- Preenchido dinamicamente -->
          <p>Adicione o conteúdo aqui.</p>
        </slot>
      </div>

      <!-- Botão único de salvar -->
      <div class="modal-footer">
        <button class="btn-save" @click="$emit('confirm')">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal",
    },
    titleAlign: {
      // Alinhamento opcional ('left', 'center', 'right')
      type: String,
      default: "center",
      validator: (value) => ["left", "center", "right"].includes(value),
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Overlay do modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Container do modal */
.modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 30px;
  max-width: 500px;
  width: 90%;
  animation: fadeIn 0.2s ease-out;
  position: relative;
  text-align: center; /* Centraliza o conteúdo */
}

/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Título */
.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.modal-title.text-left {
  text-align: left;
}

.modal-title.text-right {
  text-align: right;
}

/* Conteúdo no modal */
.modal-content {
  font-size: 1rem;
  text-align: left;
}

/* Estilo para formulário */
.modal form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaçamento entre campos */
  font-weight: 500;
}

/* Estilo geral para os campos de entrada (input, textarea e select) */
.modal form input,
.modal form textarea,
.modal form select {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  padding: 12px; /* Adiciona um bom espaçamento interno */
  border: 1px solid #ccc; /* Borda padrão */
  border-radius: 8px; /* Arredonda as bordas */
  width: 100%; /* Ocupa toda a largura disponível */
  box-sizing: border-box; /* Inclui o padding no tamanho total */
  transition: border-color 0.3s ease-in-out;
  margin-top: 8px;
}

/* Efeito ao focar nos campos */
.modal form input:focus,
.modal form textarea:focus,
.modal form select:focus {
  border-color: #007bff; /* Borda azul em foco */
  outline: none; /* Remove o outline padrão */
}

/* Textarea específico */
.modal form textarea {
  resize: vertical; /* Permite redimensionamento apenas na vertical */
  min-height: 100px; /* Define altura mínima */
}

/* Contêiner do radio-button */
.radio-group {
  display: flex;
  gap: 15px; /* Espaçamento entre opções */
  align-items: center;
}

/* Radio */
.radio-option {
  display: flex;
  align-items: center;
  gap: 8px; /* Espaço entre o botão e o texto */
  font-size: 1rem;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  display: none; /* Esconde o botão padrão */
}

.radio-option .custom-radio {
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 50%;
  background-color: white;
  transition: all 0.3s ease;
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

/* Botão de salvar */
.modal-footer {
  display: flex;
  justify-content: space-between;
}

.btn-save {
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
  margin-top: 20px;
}

.btn-save:hover {
  background-color: #007bff;
}

/* Botão fechar */
.modal-close {
  position: absolute;
  top: 0px;
  right: 10px;
  font-weight: bold;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: red;
}

/* Responsividade */
@media (max-width: 768px) {

  .btn-save {
    width: 100%; /* O botão ocupa toda a largura em telas pequenas */
  }
}
</style>