<template>
  <div class="card b-radius border-secondary h-100 bg-white">
    <img :src="car.image" class="card-img-top" :alt="car.name" />
    <div class="card-body">
      <div class="d-flex">
        <div class="w-50">
          <div class="font-secondary text-info fw-bold" style="line-height: 1;">
            <p class="mb-1 car-name">{{ car.name }}</p>
            <span class="text-info car-price">od {{ formatPrice(car.price) }}</span>
          </div>
          <div class="text-light font-secondary fs-6 mt-2">
            <span v-for="(item, index) in car.info" :key="index">
              {{ item }}<span v-if="index < car.info.length - 1"> • </span>
            </span>
          </div>
        </div>
        <div class="w-50 d-flex flex-column justify-content-end align-items-end  text-end">
          <button class="btn btn-primary btn--small rounded-pill" @click="$emit('select', car)">
            Sprawdź
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Car } from '@/types/car'
import { formatPrice } from '@/utils/formatters'

defineProps<{
  car: Car
}>()

defineEmits<{
  (e: 'select', car: Car): void
}>()
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}

.car-name {
  font-size: 18px !important;
}

.car-price {
  font-size: 20px !important;
}

.btn--small {
  font-size: 12px !important;
  min-height: 22px;
  width: 88px;
  padding: 0;
}

.card {
  overflow: hidden;
}
</style>
