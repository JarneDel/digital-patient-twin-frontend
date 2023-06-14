<script setup lang='ts'>
import { AlertType } from '~/interfaces/AlertType'
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
const routeID = useRoute().params.dokterid as string
const id = ref(routeID)
id.value = '878c95cf-e82d-40a5-a56c-8790427f1657'

useHead({
  title: 'Gegevens patiënt',
  meta: [
    {
      name: 'description',
      content: 'Patiënt detailpagina.',
    },
  ],
})

const url =
  'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657'

const { error, data, pending } = await useFetch<PatientGegevens>(url)

const result = computed<PatientGegevens[]>(() => {
  const lijst: PatientGegevens[] = []
  if (data.value) {
    lijst.push(data.value)
  }
  return lijst
})

</script>

<template>
  <div
    class="m-5 flex flex-col items-center justify-between md:flex-row"
    v-if="result"
  >
    <PressablesGoback link="patientgegevens"></PressablesGoback>

    <NuxtLink to='/dokter/patienten/[patientid]/edit'>
      <PressablesEdit></PressablesEdit>
    </NuxtLink>
  </div>

  <div
    class="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-20 lg:grid-cols-4"
  >
    <!-- profiel -->
    <div class="mx-auto lg:col-span-1">
      <img src="public/Images/profile.png" alt="" />
      <div class="flex text-lg font-semibold">
        <p
          :key="Math.random()"
          v-if="result"
          v-for="naam in result"
          class="text-center"
        >
          {{ naam.algemeen?.voornaam }}
        </p>
        <p
          :key="Math.random()"
          v-if="result"
          v-for="naam in result"
          class="text-center"
        >
          {{ naam.algemeen?.naam }}
        </p>
      </div>

      <!-- meldingen -->
      <FormsSelectDevice class="-mx-5"></FormsSelectDevice>
      <div class="inline-flex items-center gap-4">
        <h1 class="font-semibold">Harstslag</h1>
        <PressablesSwitch></PressablesSwitch>
      </div>
    </div>

    <!-- persoonlijke -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Persoonlijke gegevens</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">geslacht</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.algemeen?.geslacht }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Geboortedatum:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.algemeen?.geboorteDatum.toString() }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Geboorteland:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.algemeen?.geboorteland }}
          </p>
        </div>
      </div>

      <!-- adres -->
      <TextKop2 class="my-5">Adres informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Straatnaam:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.algemeen?.Straatnaam }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Postcode:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.adres?.postcode }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Gemeente:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.adres?.gemeente }}
          </p>
        </div>
      </div>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Medische informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Lengte:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.medisch?.lengte }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Gewicht:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.medisch?.gewicht }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Bloedgroep:</h1>
          <p :key="Math.random()" v-if="result" v-for="naam in result">
            {{ naam.medisch?.bloedgroep }}
          </p>
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