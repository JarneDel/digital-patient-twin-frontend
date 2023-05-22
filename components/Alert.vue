<template>
  <div class="bg-white p-5">
    <div class="rounded-lg bg-white p-5 drop-shadow-2xl">
      <div class="rounded-lg">
        <HeartPulseIcon
          :size="50"
          class="rounded-md bg-primary-50 text-primary-300"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bloodpressure from '../components/svg/bloodpressure.vue'
import { HeartPulseIcon } from 'lucide-vue-next'
</script>

<style scoped></style>
