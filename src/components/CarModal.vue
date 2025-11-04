<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" @click.self="closeModal">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content shadow-lg border-0 rounded-4 overflow-hidden">
        <div class="modal-header bg-light">
          <h5 class="modal-title fw-bold">
            {{ car.name }} — Szczegóły modelu
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body p-4">
          <div class="row g-4">
            <div class="col-md-7">
              <CarGallery :car="car" v-model:selectedImage="selectedImage" />
            </div>
            <div class="col-md-5">
              <div class="mb-3">
                <label class="fw-semibold d-block mb-2">Wersja</label>
                <div class="btn-group" role="group">
                  <button v-for="version in versions" :key="version" class="btn"
                    :class="selectedVersion === version ? 'btn-primary' : 'btn-outline-primary'"
                    @click="selectedVersion = version">
                    {{ version }}
                  </button>
                </div>
              </div>

              <div class="mb-3">
                <label class="fw-semibold d-block mb-2">Kolor</label>
                <div class="d-flex gap-2">
                  <div v-for="color in colors" :key="color.name" class="color-circle"
                    :style="{ backgroundColor: color.hex }" :class="{ selected: selectedColor === color.name }"
                    @click="selectedColor = color.name"></div>
                </div>
              </div>

              <div class="mb-3">
                <label class="fw-semibold d-block mb-2">Dodatki</label>
                <div class="d-flex gap-2 flex-wrap">
                  <button v-for="addon in addons" :key="addon" class="btn btn-sm"
                    :class="selectedAddons.includes(addon) ? 'btn-success' : 'btn-outline-success'"
                    @click="toggleAddon(addon)">
                    {{ addon }}
                  </button>
                </div>
              </div>

              <div class="mb-3 border rounded p-3 bg-light">
                <p class="fw-bold fs-5 mb-0">Cena</p>
                <p class="text-success fs-4 mb-2">{{ formatPrice(car.price) }}</p>
                <button class="btn btn-success w-100" @click="saveConfiguration">
                  Znajdź punkt sprzedaży
                </button>
              </div>

              <div class="border rounded p-3">
                <h6 class="fw-bold mb-2">Kluczowe cechy</h6>
                <ul class="list-unstyled small mb-0">
                  <li v-for="(value, key) in car.features" :key="key"
                    class="d-flex justify-content-between border-bottom py-1">
                    <span>{{ key }}</span>
                    <strong>{{ value }}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer bg-light">
          <button class="btn btn-outline-secondary" @click="closeModal">Anuluj</button>
          <button class="btn btn-primary" @click="saveConfiguration">Znajdź dealera</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatPrice } from '@/utils/formatters'
import CarGallery from './CarGallery.vue'
import type { Car } from '@/types/car'

const props = defineProps<{ car: Car }>()
const emit = defineEmits(['close'])

const selectedImage = ref(props.car.images?.[0] || props.car.image)
const selectedVersion = ref('Podstawowa')
const selectedColor = ref('Czarny')
const selectedAddons = ref<string[]>([])

const versions = ['Podstawowa', 'Sport', 'Performance']
const colors = [
  { name: 'Czarny', hex: '#000000' },
  { name: 'Biały', hex: '#e8e8e8' },
  { name: 'Zielony', hex: '#2f6f4f' }
]
const addons = ['Koła zimowe', 'Akcesoria']

const toggleAddon = (addon: string) => {
  if (selectedAddons.value.includes(addon)) {
    selectedAddons.value = selectedAddons.value.filter(a => a !== addon)
  } else {
    selectedAddons.value.push(addon)
  }
}

const closeModal = () => emit('close')

const saveConfiguration = () => {
  const config = {
    carId: props.car.id,
    version: selectedVersion.value,
    color: selectedColor.value,
    addons: selectedAddons.value
  }
  localStorage.setItem('selectedCarConfig', JSON.stringify(config))
  emit('close')
}
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1050;
}

.color-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-circle.selected {
  border-color: #0d6efd;
  transform: scale(1.1);
}
</style>
