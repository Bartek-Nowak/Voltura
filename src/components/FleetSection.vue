<template>
  <section class="mb-5">
    <h4 class="fw-bold mb-4">Gama naszych samochodów</h4>
    <p class="text-muted preserve-whitespace">
      Voltura oferuje rozwiązania flotowe i korporacyjne, które łączą oszczędności z nowoczesnym wizerunkiem.<br />
      Nasze samochody elektryczne sprawdzają się zarówno w dużych flotach, jak i w małych firmach, dla których liczy się
      ekonomia, niezawodność i troska o środowisko.
    </p>

    <div class="accordion" id="faqAccordion">
      <div class="accordion-item" v-for="(item, index) in faqList" :key="item.id">
        <h2 class="accordion-header" :id="'heading' + item.id">
          <button class="accordion-button" :class="{ collapsed: index !== 0 }" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + item.id" :aria-expanded="index === 0 ? 'true' : 'false'">
            {{ item.question }}
          </button>
        </h2>

        <div :id="'collapse' + item.id" class="accordion-collapse collapse" :class="{ show: index === 0 }"
          :data-bs-parent="'#faqAccordion'">
          <div class="accordion-body">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFaq, type FaqItem } from '@/api/faq'

const faqList = ref<FaqItem[]>([])

const fetchFaq = async () => {
  try {
    faqList.value = await getFaq()
  } catch (error) {
    console.error('Failed to load FAQ:', error)
  }
}

onMounted(fetchFaq)
</script>

<style scoped>
.accordion-button {
  font-weight: 500;
  background-color: #E5E7EB;
  color: #000;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.75rem 1rem;
}

.accordion-button:not(.collapsed) {
  background-color: white;
  box-shadow: none;
}

.accordion-header {
  background-color: #fff;
}

.accordion-body {
  background-color: white;
  padding: 1rem;
  display: block;
  overflow: hidden;
}

.accordion-item {
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.375rem;
  overflow: hidden;
}

.accordion-item:has(.accordion-button[aria-expanded="true"]) {
  border: 1px solid #6B7280;
}

.accordion-collapse {
  max-height: 0;
}

.accordion-collapse.show {
  max-height: 500px;
}
</style>
