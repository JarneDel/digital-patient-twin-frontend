<template>
  <div class="bg-white p-5">
    <div class="flex rounded-lg bg-white p-5 drop-shadow-2xl">
      <!-- <div class="rounded-lg">
        <HeartPulseIcon
          class="h-14 w-14 rounded-md bg-primary-50 p-2 text-primary-300"
        />
      </div> -->
      <div class="ml-5 flex flex-row">
        <bloodpressure
          class="h-14 w-14 rounded-md bg-primary-50 p-2 text-primary-300"
        />
        <div class="ml-5">
          <h1 class="text-md font-semibold">Joshy Jonckheere</h1>
          <p class="text-sm font-medium text-gray-500">1u geleden</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bloodpressure from '../components/svg/bloodpressure.vue'
</script>

<style scoped></style>
