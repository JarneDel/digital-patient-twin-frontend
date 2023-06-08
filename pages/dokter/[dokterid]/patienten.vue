<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
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

  console.log(isEditing.value)
}
const routeID = useRoute().params.dokterid as string
const id = ref(routeID)
id.value = "878c95cf-e82d-40a5-a56c-8790427f1657"

const selected = ref(0)
const isSelected = ref(false)

const updateSelectedCount = (count: number) => {
  selected.value = count
}

useHead({
  title: 'Patiënten',
  meta: [
    {
      name: 'description',
      content: 'Patiënten pagina. Bekijk al je patiënten zien.',
    },
  ],
})

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
    <PressablesEdit @clickDelete="clickEdit" v-model:is-editing="isEditing" />
  <div class="m-20 flex items-center justify-between">
    <h1 class="text-3xl font-semibold">Patiënt lijst</h1>
  </div>
  <div class="m-20 flex flex-col items-center justify-between lg:flex-row">
    <button @click="addPatient" class="rounded-lg bg-secondary-400 p-5">
      <Plus class="h-8 w-8" />
    </button>

    <patients-realtime :for="id" class="mx-12 my-10 shadow-normal" :type="view" />

    <PressablesEdit
      @clickDelete="clickEdit"
      v-model:is-editing="isEditing"
      :selected-count="selected"
      @checkboxSelected="updateSelectedCount"
      @update:isEditing="$emit('update:isEditing', $event)"
    />
  </div>

  <patients-patientcard-edit
    v-for="patient in patients"
    :key="patient.id"
    :selected-count="selected"
    :patient="patient"
    :is-editing="isEditing"
    :is-checked="isSelected"
    @update:checked="isSelected = $event"
    @checkboxSelected="updateSelectedCount"
    @update:isEditing="$emit('update:isEditing', $event)"
    @update:selected-count="selected = $event"
  />
  <!-- 
  <patients-patientcard-edit
    :patient="registerPatient"
    :selected-count="selected"
    :is-editing="isEditing"
    :is-checked="isSelected"
    @update:checked="isSelected = $event"
    @checkboxSelected="updateSelectedCount"
    @update:isEditing="$emit('update:isEditing', $event)"
    @update:selected-count="selected = $event"
  ></patients-patientcard-edit> -->
</template>

<style scoped></style>
