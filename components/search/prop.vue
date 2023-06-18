<script lang='ts' setup>
import { LucideSearch } from 'lucide-vue-next'
</script>

<template>
  <div class='grid grid-cols-1 grid-rows-1 w-full max-w-lg mx-4'>
    <input id='patientSearch' aria-label='Zoek patient'
           class='p-2 py-1 w-full rounded-lg row-start-1 col-start-1 bg-gray-200 outline-none ring-transparent ring-2 focus:ring-tertiary-500' placeholder='Patient zoeken...' type='text'>
    <lucide-search class='m-2 row-start-1 col-start-1 justify-self-end text-neutral-700'></lucide-search>
  </div>
</template>

<style scoped>

</style>