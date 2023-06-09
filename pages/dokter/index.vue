<script setup lang="ts">
import { AlertType, IMelding } from '~/interfaces/AlertType'
import { IPatientAlgemeen } from '~/interfaces/IPatient'
import { AccountInfo } from "@azure/msal-browser"
import { msalInstance } from '~/auth'
const isLoggedIn = ref(false)
const user = ref<AccountInfo|null>(null)
onMounted(()=>{
  const loggedInUser = msalInstance.getAllAccounts()
  console.log(loggedInUser[0].name)
  user.value = loggedInUser[0]

})

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Welkom op de homepage.',
    },
  ],
})

const meldingen = ref<IMelding[]>([
  {
    id: 1,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 6 * 1000),
    type: AlertType.BloodPressure,
    value: '95/120',
    level: 'danger',
    dateOfBirth: '01/01/1980',
    patientId: '1',
  },
  {
    id: 2,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: AlertType.temperature,
    value: '37',
    level: 'danger',
    dateOfBirth: '01/01/1980',
    patientId: '1',
  },
  {
    id: 3,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: AlertType.oxygen,
    value: '95',
    level: 'warning',
    dateOfBirth: '01/01/1980',
    patientId: '1',
  },
])

const pinnedPatients = ref<IPatientAlgemeen[]>([
  {
    geboorteDatum: new Date(1980, 1, 1),
    id: 1,
    naam: 'Jonkheere',
    voornaam: 'Joshy',
    geslacht: 'Man',
    Straatnaam: 'Kerkstraat',
    geboorteland: 'België',
  },
  {
    geboorteDatum: new Date(1985, 3, 7),
    id: 2,
    naam: 'Heard',
    voornaam: 'Amber',
    geslacht: 'Vrouw',
    Straatnaam: 'Kerkstraat',
    geboorteland: 'België',
  },
  {
    geboorteDatum: new Date(1999, 5, 30),
    id: 3,
    naam: 'De Koek',
    voornaam: 'Frankie',
    geslacht: 'Anders',
    Straatnaam: 'Kerkstraat',
    geboorteland: 'België',
  },
])

const removeFromList = (id: number) => {
  meldingen.value = meldingen.value.filter(melding => melding.id !== id)
}
const unpin = (id: number) => {
  pinnedPatients.value = pinnedPatients.value.filter(
    patient => patient.id !== id,
  )
}

</script>

<template>
  <div class="mx-auto my-12 max-w-[67rem]">
    <h2 v-if='user !== null' class="mx-8 mb-8 mt-6 text-3xl font-semibold">
      Welkom, {{ user.name }}
    </h2>
    <!--    Grid container -->
    <div
      class="mx-8 flex grid-flow-col grid-cols-[max-content,_max-content] grid-rows-[min-content,_1fr] flex-col gap-4 gap-x-8 xl:grid 2xl:gap-x-16"
    >
      <!--      Title Left      -->
      <TextKop2>Gepinde Patiënten</TextKop2>
      <!--      Content Left      -->
      <div class="flex flex-col gap-4">
        <patients-sm
          v-for="patient of pinnedPatients"
          :key="patient.id"
          :patient="patient"
          @unpin="unpin(patient.id)"
        ></patients-sm>
      </div>
      <!--      Title Right      -->
      <TextKop2>Ernstige meldingen</TextKop2>

      <!--      Content right    -->
      <div class="flex max-w-[30rem] flex-col gap-4">
        <AlertsPinned
          v-for="melding of meldingen"
          :key="melding.id"
          :level="melding.level"
          :value="melding.value"
          :datetime="melding.time"
          :name="melding.name"
          :type="melding.type"
          @remove="removeFromList(melding.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
