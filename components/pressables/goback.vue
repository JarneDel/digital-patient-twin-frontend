<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

defineProps({
  link: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="inline-block p-5">
    <NuxtLink to="/">
      <ArrowLeft class="mx-2 inline rounded-lg bg-secondary-100" :size="28" />
    </NuxtLink>
    <h1 class="inline font-semibold">{{ link }}</h1>
  </div>
</template>

