<template>
  <section class="mb-5">
    <h4 class="fw-bold mb-4">Gama naszych samochodów</h4>
    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4 px-4 py-3 border b-radius bg-white">
      <div class="d-flex flex-wrap gap-3">
        <div class="d-flex align-items-center gap-2">
          <label class="mb-0">Typ</label>
          <select v-model="filters.type" class="form-select">
            <option value="">Wszystkie</option>
            <option v-for="type in filtersOptions.types" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="d-flex align-items-center gap-2">
          <label class="mb-0">Napęd</label>
          <select v-model="filters.engine" class="form-select">
            <option value="">Wszystkie</option>
            <option v-for="engine in filtersOptions.engines" :key="engine" :value="engine">
              {{ engine }}
            </option>
          </select>
        </div>
        <div class="d-flex align-items-center gap-2">
          <label class="mb-0">Cena</label>
          <input type="text" class="form-control" placeholder="od" :value="formatNumber(filters.priceFrom)"
            @input="onPriceFromInput($event)">
          <span>-</span>
          <input type="text" class="form-control" placeholder="do" :value="formatNumber(filters.priceTo)"
            @input="onPriceToInput($event)">
        </div>
      </div>
      <button class="btn btn-success filter-btn" @click="fetchCars">Filtruj</button>
    </div>
    <div class="row g-5">
      <div class="col-md-4" v-for="car in cars" :key="car.id">
        <CarCard :car="car" @select="openModal" />
      </div>
    </div>
    <CarModal v-if="selectedCar" :car="selectedCar" @close="selectedCar = null" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCarsByFilters, getFilterOptions } from '@/api/cars'
import CarModal from '@/components/CarModal.vue'
import CarCard from '@/components/CarCard.vue'
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

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const parseNumber = (value: string) => {
  return value.replace(/\s/g, '') === '' ? null : Number(value.replace(/\s/g, ''))
}

const onPriceFromInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  filters.value.priceFrom = parseNumber(target.value)
}

const onPriceToInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  filters.value.priceTo = parseNumber(target.value)
}

onMounted(() => {
  fetchFilters()
  fetchCars()
})
</script>

<style scoped>
.filter-btn {
  width: 135px;
  height: 44px;
  font-size: 0.875rem;
}

select {
  width: 160px;
  font-size: 0.875rem;
}

input {
  width: 81px;
  font-size: 0.875rem;
  background-color: white;
}

label {
  font-size: 0.875rem;
}

select.form-select::-ms-expand {
  display: none;
}

select.form-select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: transparent;
  padding-right: 0.5rem;
}
</style>
