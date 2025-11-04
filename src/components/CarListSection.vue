<template>
  <section class="mb-5">
    <h4 class="fw-bold mb-4">Gama naszych samochodów</h4>
    <div class="d-flex flex-wrap gap-3 align-items-center mb-4">
      <div class="d-flex align-items-center gap-2">
        <label class="fw-semibold mb-0">Typ</label>
        <select v-model="filters.type" class="form-select w-auto">
          <option value="">Wszystkie</option>
          <option v-for="type in filtersOptions.types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="fw-semibold mb-0">Napęd</label>
        <select v-model="filters.engine" class="form-select w-auto">
          <option value="">Wszystkie</option>
          <option v-for="engine in filtersOptions.engines" :key="engine" :value="engine">
            {{ engine }}
          </option>
        </select>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="fw-semibold mb-0">Cena:</label>
        <input v-model.number="filters.priceFrom" type="number" class="form-control w-auto" placeholder="od">
        <span>-</span>
        <input v-model.number="filters.priceTo" type="number" class="form-control w-auto" placeholder="do">
      </div>
      <button class="btn btn-dark" @click="fetchCars">Filtruj</button>
    </div>
    <div class="row g-3">
      <div class="col-md-4" v-for="car in cars" :key="car.id">
        <div class="card h-100">
          <img :src="car.image" class="card-img-top" :alt="car.name">
          <div class="card-body">
            <h6 class="card-title fw-bold">{{ car.name }}</h6>
            <p class="text-muted small mb-3">od {{ formatPrice(car.price) }}</p>
            <button class="btn btn-primary w-100" @click="openModal(car)">Sprawdź</button>
          </div>
        </div>
      </div>
    </div>
    <CarModal v-if="selectedCar" :car="selectedCar" @close="selectedCar = null" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCarsByFilters, getFilterOptions } from '@/api/cars'
import CarModal from '@/components/CarModal.vue'
import { formatPrice } from '@/utils/formatters'
import type { Car, Filters } from '@/types/car'

const filtersOptions = ref<{ types: string[]; engines: string[] }>({
  types: [],
  engines: []
})

const cars = ref<Car[]>([])
const selectedCar = ref<Car | null>(null)

const filters = ref<Filters>({
  type: '',
  engine: '',
  priceFrom: null,
  priceTo: null
})

const fetchFilters = async () => {
  try {
    filtersOptions.value = await getFilterOptions()
  } catch (error) {
    console.error('Failed to load filter options:', error)
  }
}

const fetchCars = async (): Promise<void> => {
  try {
    cars.value = await getCarsByFilters(filters.value)
  } catch (error) {
    console.error('Failed to load car list:', error)
  }
}

const openModal = (car: Car) => {
  selectedCar.value = car
}

onMounted(() => {
  fetchFilters()
  fetchCars()
})
</script>
