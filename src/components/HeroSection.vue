<template>
  <section class="p-4 bg-light rounded-3 mb-5">
    <div class="row align-items-center">
      <div class="col-md-6">
        <h2 class="fw-bold mb-3">Moc spotyka efektywność</h2>
        <p class="text-muted">
          Voltura e-Line to zupełnie nowa generacja samochodów elektrycznych, łączących dynamiczne
          osiągi z wyjątkową energooszczędnością.
          Zaprojektowana w oparciu o najnowsze technologie, oferuje nie tylko imponujący zasięg, ale też komfort jazdy
          na najwyższym poziomie.
          Nowoczesne systemy wspomagania kierowcy sprawiają, że każda podróż staje się bezpieczniejsza i bardziej
          intuicyjna.
          Elegancka sylwetka i dopracowane detale nadwozia podkreślają charakter premium marki Voltura.
        </p>
        <button class="btn btn-primary">Sprawdź szczegóły</button>
      </div>

      <div class="col-md-6 text-center">
        <img :src="heroCar" alt="Voltura Line" class="img-fluid rounded shadow-sm">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import heroCar from '@/assets/images/hero/hero-car.png'
</script>

<style scoped>
img {
  max-height: 400px;
  object-fit: cover;
}
</style>
