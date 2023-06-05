<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { IPatientAlgemeen } from '~/interfaces/IPatient'
// const registerPatient = ref<IPatientAlgemeen>({
//   achternaam: 'Jonkheere',
//   geslacht: 'Man',
//   voornaam: 'Joshy',
//   geboortedatum: new Date(1980, 1, 1),
//   id: 1,
// })

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

  console.log(isEditing.value)
}

// const selected = ref('oogje')
// const selected2 = ref('')
// watch(selected, () => {
//   console.log(selected.value)
// })

const patients = ref<IPatientAlgemeen[]>([
  {
    voornaam: 'Joshy',
    achternaam: 'Jonkheere',
    geslacht: 'Man',
    geboortedatum: new Date(1980, 1, 1),
    id: 1,
  },
  {
    voornaam: 'shareeb',
    achternaam: 'hashmi',
    geslacht: 'man',
    geboortedatum: new Date(1990, 2, 14),
    id: 2,
  },
])

const addPatient = () => {
  const newPatient: IPatientAlgemeen = {
    id: patients.value.length + 1,
    voornaam: 'jarne',
    achternaam: 'delarue',
    geslacht: 'man',
    geboortedatum: new Date(1980, 1, 1),
  }
  patients.value.push(newPatient)
}
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
    <button @click="addPatient" class="rounded-lg bg-secondary-400 p-5">
      <Plus class="h-8 w-8" />
    </button>

    <PressablesEdit
      :selectedCount="patients.length"
      @clickDelete="clickEdit"
      v-model:is-editing="isEditing"
      @update:isEditing="$emit('update:isEditing', $event)"
    />
  </div>

  <patients-patientcard-edit
    class="m-4"
    v-for="patient in patients"
    :key="patient.id"
    :patient="patient"
    v-model:is-editing="isEditing"
    @update:isEditing="$emit('update:isEditing', $event)"
  />
</template>

<style scoped></style>
