<script setup lang='ts'>

import { AlertType, IMelding } from '~/interfaces/AlertType'
import { IPatientAlgemeen } from '~/interfaces/IPatient'

const gebruiker = ref('Dokter Mertens')
const meldingen = ref<IMelding[]>([
  {
    id: 1,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 6 * 1000),
    type: AlertType.BloodPressure,
    value: '95/120',
    level: 'danger',
    dateOfBirth: '01/01/1980',
  },
  {
    id: 2,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: AlertType.temperature,
    value: '37',
    level: 'danger',
    dateOfBirth: '01/01/1980',
  },
  {
    id: 3,
    name: 'Joshy Jonkheere',
    time: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: AlertType.oxygen,
    value: '95',
    level: 'warning',
    dateOfBirth: '01/01/1980',
  },
])

const pinnedPatients = ref<IPatientAlgemeen[]>([{
  geboortedatum: new Date(1980, 1, 1),
  id: 1,
  achternaam: 'Jonkheere',
  voornaam: 'Joshy',
  geslacht: 'Man',
}, {
  geboortedatum: new Date(1985, 3, 7),
  id: 2,
  achternaam: 'Heard',
  voornaam: 'Amber',
  geslacht: 'Vrouw',
}, {
  geboortedatum: new Date(1999, 5, 30),
  id: 3,
  achternaam: 'De Koek',
  voornaam: 'Frankie',
  geslacht: 'Anders',
},
])


const removeFromList = (id: number) => {
  meldingen.value = meldingen.value.filter((melding) => melding.id !== id)
}
const unpin = (id: number) => {
  pinnedPatients.value = pinnedPatients.value.filter((patient) => patient.id !== id)
}

</script>

<template>
  <div class='max-w-[67rem] mx-auto'>
    <h2 class='mb-8 text-xl  mx-8 mt-6 font-semibold'>Welkom, {{ gebruiker }}</h2>
    <!--    Grid container -->
    <div class='flex flex-col grid-flow-col xl:grid grid-cols-[max-content,_max-content]  gap-x-8 gap-4 2xl:gap-x-16 grid-rows-[min-content,_1fr] mx-8'>
      <!--      Title Left      -->
      <TextKop2>Gepinde Patiënten</TextKop2>
      <!--      Content Left      -->
      <div class='flex flex-col gap-4'>
        <patients-sm v-for='patient of pinnedPatients' :key='patient.id' :patient='patient' @unpin='unpin(patient.id)'></patients-sm>
      </div>
      <!--      Title Right      -->
      <TextKop2>Ernstige meldingen</TextKop2>

      <!--      Content right    -->
      <div class='flex flex-col gap-4 max-w-[30rem] '>
        <AlertsPinned v-for='melding of meldingen' :key='melding.id' :level='melding.level' :value='melding.value'
               :datetime='melding.time' :name='melding.name' :type='melding.type'
               @remove='removeFromList(melding.id)' />

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>