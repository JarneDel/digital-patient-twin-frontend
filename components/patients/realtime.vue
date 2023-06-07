<script setup lang="ts">
import { IPatientAlgemeen } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'

defineProps({
  patient: {
    type: Object as PropType<IPatientAlgemeen>,
    required: true,
  },
  type: {
    type: String as PropType<'view' | 'edit'>,
    required: true,
  },
})

const calculateAge = (date: Date) => {
  // 01/01/2000
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// fetching function for the realtime data or websocket
</script>

<template>
  <div class="mx-auto max-w-7xl rounded-lg bg-neutral-300 p-8">
    <div class="flex flex-row content-center justify-start gap-2 lg:gap-10">
      <label for="patient-check" class="capitalize">{{
        patient.voornaam
      }}</label>
      <label for="patient-check" class="capitalize">{{
        patient.achternaam
      }}</label>
      <label for="patient-check">{{
        calculateAge(patient.geboortedatum)
      }}</label>
      <label for="patient-check" class="capitalize">{{
        patient.geslacht
      }}</label>
      <div class="flex-1 justify-between">
        <div class="flex flex-1 flex-row content-center justify-end">
          <button v-if="type === 'view'">
            <LucideLineChart />
          </button>
          <NuxtLink to="/dokter/[dokterid]/patients/[patientid]/edit">
            <button v-if="type === 'edit'">
              <LucideEdit />
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
