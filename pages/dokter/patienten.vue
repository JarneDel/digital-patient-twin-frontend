<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'


const isEditing = ref(false)
const clickEdit = () => {
  isEditing.value = !isEditing.value

  console.log(isEditing.value)
}
const routeID = useRoute().params.dokterid as string
const id = ref(routeID)
id.value = '878c95cf-e82d-40a5-a56c-8790427f1657'

const selected = ref(0)
const isSelected = ref(false)

const updateSelectedCount = (count: number) => {
  selected.value = count
}

const url =
  'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient'

const { error, data, pending } = await useFetch<PatientGegevens[]>(url)

useHead({
  title: 'Patiënten',
  meta: [
    {
      name: 'description',
      content: 'Patiënten pagina. Bekijk al je patiënten zien.',
    },
  ],
})

// const patients = ref<IPatientAlgemeen[]>([
//   {
//     voornaam: 'Joshy',
//     naam: 'Jonkheere',
//     geslacht: 'Man',
//     geboorteDatum: new Date(1980, 1, 1),
//     id: 1,
//     Straatnaam: 'Kerkstraat',
//     geboorteland: 'België',
//   },
//   {
//     voornaam: 'shareeb',
//     naam: 'hashmi',
//     geslacht: 'man',
//     geboorteDatum: new Date(1990, 2, 14),
//     id: 2,
//     Straatnaam: 'Kerkstraat',
//     geboorteland: 'België',
//   },
// ])

// const addPatient = () => {
//   const newPatient: IPatientAlgemeen = {
//     id: patients.value.length + 1,
//     voornaam: 'jarne',
//     naam: 'delarue',
//     geslacht: 'man',
//     geboorteDatum: new Date(1980, 1, 1),
//   }
//   patients.value.push(newPatient)
// }
</script>

<template>
  <PressablesEdit
    @clickDelete="clickEdit"
    v-model:is-editing="isEditing"
    @checkboxSelected="updateSelectedCount"
    :selected-count="selected"
  />
  <div class="m-20 flex items-center justify-between">
    <h1 class="text-3xl font-semibold">Patiënt lijst</h1>
  </div>
  <div class="m-20 flex flex-col items-center justify-between lg:flex-row">
    <button class="rounded-lg bg-secondary-400 p-5">
      <Plus class="h-8 w-8" />
    </button>

    <!-- <patients-realtime :for="id" class="mx-12 my-10 shadow-normal" type="view" /> -->

    <!-- <PressablesEdit
      @clickDelete="clickEdit"
      v-model:is-editing="isEditing"
      :selected-count="selected"
      @checkboxSelected="updateSelectedCount"
      @update:isEditing="$emit('update:isEditing', $event)"
    /> -->
  </div>

  <patients-patientcard-edit 
    v-for="patient in data"
    :for="id"
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
  <!-- <patients-patientcard-edit
    v-for="patient in patients"
    :for="id"
    :key="patient.id"
    :selected-count="selected"
    :patient="patient"
    :is-editing="isEditing"
    :is-checked="isSelected"
    @update:checked="isSelected = $event"
    @checkboxSelected="updateSelectedCount"
    @update:isEditing="$emit('update:isEditing', $event)"
    @update:selected-count="selected = $event"
  /> -->
</template>

<style scoped></style>
