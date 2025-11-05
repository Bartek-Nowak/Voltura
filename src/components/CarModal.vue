<template>
  <div class="modal fade show d-block font-secondary" tabindex="-1" role="dialog" @click.self="closeModal">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content shadow-lg border-0 overflow-hidden rounded-0">
        <div class="modal-header px-4">
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
              <div class="border rounded px-3 py-2 mb-3">

                <div class="mb-2 fs-6" v-if="car.versions?.length">
                  <label class="text-info d-block fs-6 mb-2">Wersja</label>
                  <div class="d-grid gap-2" style="grid-template-columns: repeat(3, 1fr);">
                    <button v-for="version in car.versions" :key="version" class="btn fs-6"
                      :class="selectedVersion === version ? 'btn-primary' : 'btn-outline-primary'"
                      @click="selectedVersion = version">
                      {{ version }}
                    </button>
                  </div>
                </div>

                <div class="mb-2 fs-6" v-if="car.colors?.length">
                  <label class="text-info d-block fs-6 mb-2">Kolor</label>
                  <div class="d-flex gap-2">
                    <div v-for="color in car.colors" :key="color.name" class="color-circle border"
                      :style="{ backgroundColor: color.hex }" :class="{ selected: selectedColor === color.name }"
                      @click="selectedColor = color.name"></div>
                  </div>
                </div>

                <div class="mb-2 fs-6" v-if="car.addons?.length">
                  <label class="text-info d-block fs-6 mb-2">Dodatki</label>
                  <div class="d-grid gap-2" style="grid-template-columns: repeat(2, 1fr);">
                    <button v-for="addon in car.addons" :key="addon" class="btn fs-6"
                      :class="selectedAddons.includes(addon) ? 'btn-primary' : 'btn-outline-primary'"
                      @click="toggleAddon(addon)">
                      {{ addon }}
                    </button>
                  </div>
                </div>


                <div class="mb-2">
                  <div class="font-secondary text-light fs-6" style="line-height: 1;">
                    Cena<br>
                    <span class="fw-bold text-info fs-4">{{ formatPrice(car.price) }}</span>
                  </div>
                  <button class="btn btn-success font-secondary fw-bold fs-6 w-100 mt-2" @click="saveConfiguration">
                    Znajdź punkt sprzedaży
                  </button>
                </div>


              </div>

              <div class="border rounded p-3" v-if="car.features">
                <h6 class="fw-bold mb-2 pb-1 border-bottom">Kluczowe cechy</h6>
                <ul class="list-unstyled small mb-0">
                  <li v-for="(value, key) in car.features" :key="key" class="d-flex justify-content-between py-1">
                    <span>{{ key }}</span>
                    <span>{{ value }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn fs-6 btn-outline-light" @click="closeModal">Anuluj</button>
          <button class="btn fs-6 btn-primary" @click="saveConfiguration">Znajdź dealera</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { formatPrice } from '@/utils/formatters'
import CarGallery from './CarGallery.vue'
import type { Car } from '@/types/car'

const props = defineProps<{ car: Car }>()
const emit = defineEmits(['close'])

const selectedImage = ref(props.car.images?.[0] || props.car.image)
const selectedVersion = ref(props.car.versions?.[0] || '')
const selectedColor = ref(props.car.colors?.[0]?.name || '')
const selectedAddons = ref<string[]>([])

watch(() => props.car, () => {
  selectedImage.value = props.car.images?.[0] || props.car.image
  selectedVersion.value = props.car.versions?.[0] || ''
  selectedColor.value = props.car.colors?.[0]?.name || ''
  selectedAddons.value = []
})

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

.modal-header .btn-close {
  --bs-btn-close-width: 0.85rem;
  --bs-btn-close-height: 0.85rem;
  padding: 0;
  width: 0.85rem;
  height: 0.85rem;
}

.color-circle {
  width: 28px;
  height: 28px;
  border-radius: 15%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-footer {
  min-height: 110px;
}

.color-circle.selected {
  transform: scale(1.3);
}

.btn {
  min-height: 40px;
  min-width: 100px;
}
</style>
