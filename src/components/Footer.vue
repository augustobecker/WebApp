<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} Minha Empresa. Todos os direitos reservados.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>