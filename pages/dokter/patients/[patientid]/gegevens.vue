<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
useHead({
  title: 'Gegevens patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt detailpagina.',
    },
  ],
})
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <!-- <PressablesGoback link="patientgegevens"></PressablesGoback> -->

    <NuxtLink to="/dokter/patients/[patientid]/edit">
      <PressablesEdit></PressablesEdit>
    </NuxtLink>
  </div>

  <div
    class="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-20 lg:grid-cols-4"
  >
    <!-- persoonlijke -->
    <div class="mx-auto lg:col-span-1">
      <img src="public/Images/profile.png" alt="" />
      <div class="flex text-lg font-semibold">
        <p
          :key="Math.random()"
          v-if="result"
          v-for="naam in result"
          class="text-center"
        >
          {{ naam.voornaam }}
        </p>
        <p
          :key="Math.random()"
          v-if="result"
          v-for="naam in result"
          class="text-center"
        >
          {{ naam.naam }}
        </p>
      </div>

      <FormsSelectDevice class="-mx-5"></FormsSelectDevice>
      <div class="inline-flex items-center gap-4">
        <h1 class="font-semibold">Harstslag</h1>
        <PressablesSwitch></PressablesSwitch>
      </div>
    </div>

    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Persoonlijke gegevens</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">geslacht</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.geslacht }}
          </p>
        </div>
        <!-- <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Voornaam:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.voornaam }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Achternaam:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.naam }}
          </p>
        </div> -->
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Geboortedatum:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.geboorteDatum.toString() }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Geboorteland:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.geboorteland }}
          </p>
        </div>
      </div>
      <TextKop2 class="my-5">Adres informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Straatnaam:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.Straatnaam }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Postcode:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.Postcode }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Gemeente:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">{{}}</p>
        </div>
      </div>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Medische informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Lengte:</h1>
          <p>{{}}</p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Gewicht:</h1>
          <p>{{}}</p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Bloedgroep:</h1>
          <p>{{}}</p>
        </div>
      </div>
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
