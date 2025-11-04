<template>
  <header class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center">
      <img :src="logo" alt="Voltura Motors" class="me-2" style="height: 40px;">
      <h5 class="m-0 fw-bold">Voltura Motors</h5>
    </div>
    <button class="btn btn-success">Zapisz się na jazdę testową</button>
  </header>
</template>

<script setup>
import logo from '@/assets/images/logo.png'
</script>

<style scoped>
header {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 0.5rem;
}
</style>
