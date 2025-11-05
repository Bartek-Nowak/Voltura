<template>
  <section class="py-5">
    <div class="bg-white border rounded-4 shadow-sm p-4">
      <div class="row align-items-center g-4">
        <div class="col-md-6">
          <h2 class="fw-bold mb-3 display-6 text-dark">
            Moc spotyka efektywność
          </h2>
          <p class="text-promo mb-2">
            Odkryj nową linię Voltura e-Line – zaprojektowaną z myślą o mieście i długich trasach
          </p>
          <p class="text-light font-secondary fs-5 mb-4 lh-lg">
            Voltura e-Line to zupełnie nowa generacja samochodów elektrycznych, łączących dynamiczne
            osiągi z wyjątkową energooszczędnością.
            Zaprojektowana w oparciu o najnowsze technologie, oferuje nie tylko imponujący zasięg,
            ale też komfort jazdy na najwyższym poziomie.
            Nowoczesne systemy wspomagania kierowcy sprawiają, że każda podróż staje się
            bezpieczniejsza i bardziej intuicyjna.
            Elegancka sylwetka i dopracowane detale nadwozia podkreślają charakter premium marki Voltura.
          </p>
          <button class="btn btn-primary px-4 py-2 fs-6 shadow-sm">
            Sprawdź szczegóły
          </button>
        </div>
        <div class="col-md-6 text-center">
          <img :src="heroCar" alt="Voltura e-Line" class="img-fluid rounded-3 shadow-sm"
            style="max-height: 380px; object-fit: cover;" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import heroCar from '@/assets/images/hero/hero-car.png'
</script>

<style scoped>
.text-promo {
  color: #1F2937;
}
</style>
