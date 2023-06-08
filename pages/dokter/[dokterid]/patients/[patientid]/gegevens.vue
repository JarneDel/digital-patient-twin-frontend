<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <PressablesGoback link="patientgegevens"></PressablesGoback>

    <NuxtLink to="/dokter/[dokterid]/patients/[patientid]/edit">
      <PressablesEdit></PressablesEdit>
    </NuxtLink>
  </div>

  <div
    class="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-20 lg:grid-cols-4"
  >
    <!-- persoonlijke -->
    <div class="lg:col-span-1">
      <FormsSelectDevice class="-mx-5"></FormsSelectDevice>
      <div class="inline-flex items-center gap-4">
        <h1 class="font-semibold">Harstslag</h1>
        <PressablesSwitch></PressablesSwitch>
      </div>
    </div>

    <div class="lg:col-span-1">
      <TextKop2>Persoonlijke gegevens</TextKop2>
      <h1>voornaam</h1>
      <h1>achternaam</h1>
      <h1>geboortedatum</h1>
      <h1>geboorteland</h1>
      <TextKop2>Adres informatie</TextKop2>
      <h1>straatnaam</h1>
      <h1>postcode</h1>
      <h1>gemeente</h1>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2>Medische informatie</TextKop2>
      <h1>lengte</h1>
      <h1>gewicht</h1>
      <h1>bloedgroep</h1>
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
