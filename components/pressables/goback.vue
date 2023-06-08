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
  <div class="flex items-center p-5">
    <NuxtLink to="/" class="mx-2 inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 text-sm font-medium ring-2 ring-transparent hover:bg-secondary-200/40 outline-none focus-visible:ring-secondary-400/80">
      <ArrowLeft :size="28" />
    </NuxtLink>
    <h1 class="inline font-semibold">{{ link }}</h1>
  </div>
</template>

