<script setup lang="ts">
import { ChevronRight, LucideLineChart } from 'lucide-vue-next'
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { ref, watchEffect, onUnmounted, getCurrentInstance } from 'vue'

const props = defineProps({
  patient: {
    type: Object as PropType<PatientGegevens>,
    required: true,
  },
})

const isSelected = ref(false)
const instance = getCurrentInstance()

const handleCheckboxChange = () => {
  isSelected.value = !isSelected.value
  console.log(isSelected.value)
  instance?.emit('checkboxSelected', props.patient.id)
}

// Cleanup function when the component is unmounted
onUnmounted(() => {
  instance?.emit('checkboxSelected', 0) // Reset selected count
})


const calculateAge = (date: string): number => {
  const today = new Date()
  const [day, month, year] = date.split('/')

  const geboortedatum = new Date(`${month}/${day}/${year}`)

  let age = today.getFullYear() - geboortedatum.getFullYear()

  const hasBirthdayOccurred =
    today.getMonth() > geboortedatum.getMonth() ||
    (today.getMonth() === geboortedatum.getMonth() &&
      today.getDate() >= geboortedatum.getDate())

  if (!hasBirthdayOccurred) {
    age--
  }

  return age
}

console.log(props.patient)
</script>

<template>
  <div class="mx-auto my-3 max-w-6xl rounded-lg bg-neutral-300 p-6">
    <div
      class="flex flex-row content-center items-center justify-start gap-2 lg:gap-10"
    >

      <input
        id="patient-check"
        type="checkbox"
        value=""
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-none accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
      />
      <div class="capitalize">{{
        patient.algemeen.voornaam
      }}</div>
      <div class="capitalize">{{
        patient.algemeen.naam
      }}</div>
      <div>{{
        calculateAge(patient.algemeen.geboorteDatum.toString())
      }}</div>
      <div class="capitalize">{{
        patient.algemeen.geslacht
      }}</div>
      <div class="flex-1 justify-between">
        <div class="flex items-center justify-end">
          <div class="flex items-center justify-end">
            <NuxtLink to="/dokter/patienten/[patientenid]">
              <LucideLineChart
                class="h-9 w-9 rounded-lg p-2 hover:bg-neutral-200/20 active:text-gray-800"
              />
            </NuxtLink>
          </div>
          <NuxtLink to="/dokter/patients/[patientid]/gegevens">
            <ChevronRight
              class="h-9 w-9 rounded-lg p-2 hover:bg-neutral-200/20 active:text-gray-800"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
