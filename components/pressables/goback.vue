<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'

defineProps({
  link_name: {
    type: String,
    required: true,
  },
  link_path: {
    type: String,
    required: true,
  },
})

// <NuxtLink
//    :to="link_path"
//   class="mx-2 inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 text-sm font-medium outline-none ring-2 ring-transparent hover:bg-secondary-200/40 focus-visible:ring-secondary-400/80"
// >
</script>

<template>
  <div class="flex items-center p-5">
    <NuxtLink tabindex="0" class='cursor-pointer mx-2 inline-flex justify-center rounded-lg border border-transparent bg-secondary-100 text-sm font-medium ring-2 ring-transparent hover:bg-secondary-200/40 outline-none focus-visible:ring-secondary-400/80'
              @click='$router.go(-1)'>
      <ArrowLeft :size="28" />
    </NuxtLink>
    <h1 class="inline font-semibold">{{ link_name }}</h1>
  </div>
</template>
