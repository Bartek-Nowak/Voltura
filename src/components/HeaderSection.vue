<template>
  <header class="header bg-white">
    <div class="container d-flex justify-content-between align-items-center h-100">
      <div class="d-flex align-items-center">
        <img :src="logo" alt="Voltura Motors" class="me-2" style="height: 40px;">
        <h5 class="m-0 fw-bold">Voltura Motors</h5>
      </div>
      <button class="btn btn-success">Zapisz się na jazdę testową</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'
</script>

<style scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #e9ecef;
  min-height: 72px;
  display: flex;
  align-items: center;
}
</style>
