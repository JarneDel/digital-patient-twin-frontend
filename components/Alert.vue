<script setup lang="ts">
import { X } from 'lucide-vue-next'
import bloodpressure from './svg/bloodpressure.vue'
</script>

<template>
  <div class="bg-white p-5">
    <div class="flex justify-between rounded-lg bg-white p-5 drop-shadow-2xl">
      <div class="ml-5 flex flex-row">
        <bloodpressure
          class="h-14 w-14 rounded-md bg-primary-50 p-2 text-primary-300"
        />
        <div class="ml-5">
          <h1 class="text-md font-semibold capitalize">bloeddruk: 120/80bpm</h1>
          <div class="mt-2 flex gap-4">
            <p class="text-sm font-medium text-gray-500">Joshy Jonkheere</p>
            <p class="text-sm font-medium text-gray-500">1u geleden</p>
          </div>
        </div>
      </div>
      <X :size="28" class="ml-auto text-gray-500 hover:cursor-pointer" />
    </div>
  </div>
</template>

<style scoped></style>
