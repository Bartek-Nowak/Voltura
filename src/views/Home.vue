<template>
  <main>
    <HeaderSection />
    <div class="container">
      <HeroSection />
      <CarListSection />
      <PromoSection />
      <FleetSection />
      <InnovationSection />
    </div>
    <FooterSection />
  </main>
</template>

<script setup lang="ts">
import HeaderSection from '@/components/HeaderSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import CarListSection from '@/components/CarListSection.vue'
import PromoSection from '@/components/PromoSection.vue'
import FleetSection from '@/components/FleetSection.vue'
import InnovationSection from '@/components/InnovationSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>
