<template>
  <section
    class="innovation-section b-radius p-5 text-center text-white d-flex align-items-center justify-content-center">
    <h3 class="fw-bold mb-0">
      Postaw na innowację. Postaw na Voltura.
    </h3>
  </section>
</template>

<style scoped>
.innovation-section {
  position: relative;
  background-image: url('/cars/voltura-zx-2025-3.png');
  background-size: cover;
  background-position: center 75%;
  min-height: 295px;
  margin: 20px 0 20px;
  overflow: hidden;
}

.innovation-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(23, 68, 142, 0.75);
  z-index: 0;
}

.innovation-section h3 {
  position: relative;
  z-index: 1;
}
</style>
