<template>
  <div class="mx-auto max-w-7xl rounded-lg bg-neutral-300 p-8">
    <div class="flex flex-row content-center justify-start gap-2 lg:gap-10">
      <input
        id="patient-check"
        type="checkbox"
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-none accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
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
        <NuxtLink to="/dokter/[dokterid]/patients/[patientid]/vitals">
          <div class="flex items-center justify-end">
            <ChevronRight
              class="h-6 w-6 transition-all duration-300 hover:scale-125 hover:cursor-pointer hover:text-secondary-500"
            />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { IPatientAlgemeen } from '~/interfaces/IPatient'
import { ref, watchEffect, onUnmounted, getCurrentInstance } from 'vue'

const isSelected = ref(false)
const instance = getCurrentInstance()

const handleCheckboxChange = () => {
  isSelected.value = !isSelected.value
  instance?.emit('checkboxSelected', isSelected.value ? isSelected.value : 0)
}

// Cleanup function when the component is unmounted
onUnmounted(() => {
  instance?.emit('checkboxSelected', 0) // Reset selected count
})

// Watch for changes in the isSelected value
watchEffect(() => {
  if (isSelected.value) {
    instance?.emit('checkboxSelected', 1)
  }
})

const props = defineProps<{
  patient: IPatientAlgemeen
}>()

const patient: IPatientAlgemeen = props.patient

const calculateAge = (date: Date) => {
  // 01/01/2000
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
</script>

<style scoped></style>
