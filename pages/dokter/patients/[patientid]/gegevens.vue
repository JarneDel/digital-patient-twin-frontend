<script setup lang="ts">
import { AlertType } from '~/interfaces/AlertType'
import {
  IPatientAlgemeen,
  PatientGegevens,
  Address,
  Medisch,
} from '~/interfaces/IPatient'
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
const patient: IPatientAlgemeen = data.value?.algemeen as IPatientAlgemeen
const patientAdres: Address = data.value?.adres as Address
const patientMedisch: Medisch = data.value?.medisch as Medisch

// const calculateAge = (date: string): number => {
//   const today = new Date()
//   const [day, month, year] = date.split('/')

//   const geboortedatum = new Date(`${month}/${day}/${year}`)

//   let age = today.getFullYear() - geboortedatum.getFullYear()

//   const hasBirthdayOccurred =
//     today.getMonth() > geboortedatum.getMonth() ||
//     (today.getMonth() === geboortedatum.getMonth() &&
//       today.getDate() >= geboortedatum.getDate())

//   if (!hasBirthdayOccurred) {
//     age--
//   }

//   return age
// }

const result = computed<IPatientAlgemeen[]>(() => {
  const lijst: IPatientAlgemeen[] = []
  if (data.value?.algemeen) {
    lijst.push(data.value.algemeen)
  }

  return lijst
})
</script>

<template>
  <div class="m-5 flex flex-col items-center justify-between md:flex-row">
    <PressablesGoback
      link_path="/dokter/patienten"
      link_name="patient gegevens"
    ></PressablesGoback>

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
        <p>{{ patient.voornaam }} {{ patient.naam }}</p>
      </div>

      <FormsSelectDevice class="-mx-5"></FormsSelectDevice>
      <div class="inline-flex items-center gap-4">
        <h1 class="font-semibold">Harstslag</h1>
        <PressablesSwitch></PressablesSwitch>
      </div>
    </div>

    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Persoonlijke informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">geslacht</h1>
          <p>{{ patient.geslacht }}</p>
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
          <p>
            {{ patient.geboorteDatum.toString() }}
          </p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Geboorteland:</h1>
          <p>
            {{ patient.geboorteland }}
          </p>
        </div>
      </div>
      <TextKop2 class="my-5">Adres informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Straatnaam:</h1>
          <p>{{ patientAdres.straat }}</p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Postcode:</h1>
          <p>{{ patientAdres.postcode }}</p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Gemeente:</h1>
          <p>{{ patientAdres.gemeente }}</p>
        </div>
      </div>
    </div>

    <!-- medisch -->
    <div class="lg:col-span-1">
      <TextKop2 class="my-5">Medische informatie</TextKop2>
      <div class="flex flex-col gap-5">
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Lengte:</h1>
          <p>{{ patientMedisch.lengte }}</p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Gewicht:</h1>
          <p>{{ patientMedisch.gewicht  +'kg'}}</p>
        </div>
        <div class="flex items-center">
          <h1 class="mr-3 font-medium capitalize">Bloedgroep:</h1>
          <p v-if="patientMedisch.bloedgroep">
            {{ patientMedisch.bloedgroep }}
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
