<script setup lang="ts">
import { IPatientAlgemeen } from '~/interfaces/IPatient'
const registerPatient = ref<IPatientAlgemeen>({
  achternaam: 'Jonkheere',
  geslacht: 'Man',
  voornaam: 'Joshy',
  geboortedatum: new Date(1980, 1, 1),
  id: 1,
})

// const patients: IPatientAlgemeen[] = [
//   {
//     achternaam: 'Jonkheere',
//     geslacht: 'Man',
//     voornaam: 'Joshy',
//     geboortedatum: new Date(1980, 1, 1),
//     id: 1,
//   },
//   {
//     achternaam: 'J',
//     geslacht: 'Vrouw',
//     voornaam: 'J',
//     geboortedatum: new Date(1990, 2, 14),
//     id: 2,
//   },
// ]

const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value
}

const selected = ref('oogje')
const selected2 = ref('')
watch(selected, () => {
  console.log(selected.value)
})
</script>

<template>
  <div class="m-20 flex items-center justify-between">
    <h1 class="text-3xl font-semibold">Patiënt lijst</h1>
    <!-- <PressablesSelector
      :options="['oogje', 'patiënt']"
      v-model:selected="selected"
    /> -->
  </div>
  <div class="m-20 flex items-center justify-between">
    add patient
    <PressablesEdit v-model:is-editing="isEditing" />
  </div>

  <patients-patientcard-edit class="mx-20" :patient="registerPatient" />
</template>

<style scoped></style>
