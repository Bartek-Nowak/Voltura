<template>
  <div>
    <img :src="images[0]" class="img-fluid rounded mb-3 w-100" :alt="car.name" />
    <div class="d-flex gap-2" v-if="images.length > 1">
      <img v-for="(img, idx) in images.slice(1)" :key="img" :src="img" class="img-thumbnail rounded cursor-pointer"
        style="width: 100px; height: 70px; object-fit: cover;" @click="swapWithMain(idx + 1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Car } from '@/types/car'

const props = defineProps<{ car: Car }>()

const images = ref<string[]>([])

const initImages = () => {
  images.value = [
    ...(props.car.images?.filter((img): img is string => !!img) || []),
    ...(props.car.images?.length ? [] : props.car.image ? [props.car.image] : [])
  ]
}

const swapWithMain = (idx: number) => {
  const mainImage = images.value[0]
  const selectedImage = images.value[idx]

  if (!mainImage || !selectedImage) return

  images.value[0] = selectedImage
  images.value[idx] = mainImage
}

watch(
  () => props.car.images,
  () => initImages()
)

onMounted(initImages)
</script>
