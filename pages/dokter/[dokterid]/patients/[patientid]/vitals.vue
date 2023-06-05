<script setup lang="ts">
import { Eye } from 'lucide-vue-next';
import { IPatientAlgemeen } from '~/interfaces/IPatient'
const registerPatient = ref<IPatientAlgemeen>({
  achternaam: 'Jonkheere',
  geslacht: 'M',
  voornaam: 'Joshy',
  geboortedatum: new Date(1980, 1, 1),
  id: 1,
})

const selected = ref<string>('')
const options = ref<any[]>([])
</script>

<template>
  <div class="flex flex-1 items-center justify-end p-5">
    <PressablesSelector
      :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      v-model:selected="selected"
    />
  </div>

  <PatientsRealtime type="edit" :patient="registerPatient"></PatientsRealtime>
  <PatientsRealtime type="view" :patient="registerPatient"></PatientsRealtime>
</template>

<style scoped></style>
