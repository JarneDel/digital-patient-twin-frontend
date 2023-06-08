<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <PressablesGoback link="Nieuwe Patient aanmaken"></PressablesGoback>

    <NuxtLink to="/dokter/[dokterid]/patients/[patientid]/edit">
      <PressablesEdit></PressablesEdit>
    </NuxtLink>
  </div>

  <div
    class="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-20 lg:grid-cols-4"
  >
    <!-- persoonlijke -->
    <div class="lg:col-span-1">
      <FormsSelectDevice></FormsSelectDevice>
      <div class="inline-block">
        <h1 class="font-semibold">Harstslag</h1>
        <PressablesSwitch></PressablesSwitch>
      </div>
    </div>

    <div class="lg:col-span-1">
      <TextKop2>Persoonlijke gegevens</TextKop2>
      <TextKop2>Adres gegevens</TextKop2>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2>Medische gegevens</TextKop2>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
