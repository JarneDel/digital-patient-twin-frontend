<template>
  <div class="m-10 max-w-5xl rounded-lg bg-neutral-300 p-8">
    <div
      class="flex flex-col items-start justify-between gap-10 sm:flex-row lg:items-center"
    >
      <input
        id="patient-check"
        type="checkbox"
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-none accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
      />

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
        <NuxtLink to="/">
          <div class="flex items-center justify-end">
            <ChevronRight class="h-6 w-6" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { IPatientAlgemeen } from '~/interfaces/IPatient'
import { LucideLineChart, LucideEdit } from 'lucide-vue-next'

defineProps({
  patient: {
    type: Object as PropType<IPatientAlgemeen>,
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
</script>

<style scoped></style>