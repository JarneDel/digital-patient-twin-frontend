<template>
  <!-- <div class="m-10 rounded-lg bg-neutral-300 p-5">
    <div class="flex items-center gap-3">
      <input
        id="patient-check"
        type="checkbox"
        value=""
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-gray-300 bg-gray-100 accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
      />
      <label for="patient-check">Joshy Jonkheere</label>
      <label for="patient-check">mm/dd/jjjj</label>
      <label for="patient-check">Man</label>
    </div>
  </div> -->
  <div class="m-10 max-w-5xl rounded-lg bg-neutral-300 p-8">
    <div
      class="flex flex-col items-start justify-between gap-10 sm:flex-row lg:items-center"
    >
      <input
        id="patient-check"
        type="checkbox"
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-gray-300 bg-gray-100 accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
      />

      <label for="patient-check">Joshy Jonkheere</label>
      <label for="patient-check">Jonkheere</label>
      <label for="patient-check">mm/dd/jjjj</label>
      <label for="patient-check">Man</label>
      <div class="flex-1 justify-between">
        <NuxtLink to="/">
          <div class="flex items-center justify-end">
            <ChevronRight class="h-6 w-6" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
</script>

<style scoped></style>
