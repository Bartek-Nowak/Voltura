<template>
  <div>
    <img :src="images[0]" class="img-fluid rounded mb-3 w-100" :alt="car.name" />
    <div class="thumbnail-grid" v-if="images.length > 1">
      <div v-for="(img, idx) in images.slice(1)" :key="img" class="thumbnail-wrapper rounded"
        @click="swapWithMain(idx + 1)">
        <img :src="img" :alt="car.name" class=" cursor-pointer" />
      </div>
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

watch(() => props.car.images, initImages)
onMounted(initImages)
</script>

<style scoped>
.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.thumbnail-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.thumbnail-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
}
</style>
