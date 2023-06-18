<script setup lang="ts">
import { IPatientAlgemeen } from '~/interfaces/IPatient'

const registerPatient = ref<IPatientAlgemeen>({
  naam: 'Jonkheere',
  geslacht: 'M',
  voornaam: 'Joshy',
  geboorteDatum: new Date(1980, 1, 1),
  id: 1,
})

const selected = ref<string>('')
const options = ref<any[]>(['oogje, patient'])
watch(selected, () => {
  console.log(selected.value)
})
</script>

<template>
  <div class="mx-5 flex flex-1 items-center justify-end p-5">
    <PressablesSelector
      :options="['oogje', 'patient']"
      v-model:selected="selected"
    />
  </div>

  <PatientsRealtime
    for="id"
    type="edit"
    class="m-4"
    :patient="registerPatient"
  ></PatientsRealtime>
  <PatientsRealtime
    for="id"
    type="view"
    :patient="registerPatient"
  ></PatientsRealtime>
</template>

<style scoped></style>
