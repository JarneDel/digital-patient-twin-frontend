<script setup lang="ts">
import { ChevronRight, LucideLineChart } from 'lucide-vue-next'
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
import { ref, watchEffect, onUnmounted, getCurrentInstance } from 'vue'
import { id } from 'date-fns/locale';

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
  // instance?.emit('checkboxSelected', isSelected.value ? isSelected.value : 0)
  instance?.emit('checkboxSelected', props.patient.id)
}

// Cleanup function when the component is unmounted
onUnmounted(() => {
  instance?.emit('checkboxSelected', 0) // Reset selected count
})

// Watch for changes in the isSelected value
// watchEffect(() => {
//   if (isSelected.value) {
//     instance?.emit('checkboxSelected', 1)
//   }
// })

const url =
  'https://patientgegevens--hml08fh.blackdune-2fd1ec46.northeurope.azurecontainerapps.io/patient/878c95cf-e82d-40a5-a56c-8790427f1657'

const { error, data, pending } = await useFetch<PatientGegevens>(url)

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
  <div class="mx-auto my-3 max-w-6xl rounded-lg bg-neutral-300 p-6" >
    <div class="flex flex-row content-center items-center justify-start gap-2 lg:gap-10">
      <input
        id="patient-check"
        type="checkbox"
        value=""
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-none accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
      />
      <!-- <input
        v-model=""
        id="patient-check"
        type="checkbox"
        class="form-checkbox form-tertiary-500 h-6 w-6 rounded border-none accent-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-500 focus:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
      /> -->

      <label
        for="patient-check"
        class="capitalize"
        >{{ patient.algemeen.voornaam }}</label
      >
      <label for="patient-check" class="capitalize">{{
        patient.algemeen.naam
      }}</label>
      <label for="patient-check">{{
        calculateAge(patient.algemeen.geboorteDatum.toString())
      }}</label>
      <label for="patient-check" class="capitalize">{{
        patient.algemeen.geslacht
      }}</label>
      <div class="flex-1 justify-between">
        <div class="flex items-center justify-end">
          <div class="flex items-center justify-end">
            <NuxtLink to="/dokter/patients/[patientenid]">
              <LucideLineChart
                class="h-9 w-9 p-2 rounded-lg hover:bg-neutral-200/20 active:text-gray-800"
              />
            </NuxtLink>
          </div>
          <NuxtLink to="/dokter/patients/[patientid]/gegevens">
            <ChevronRight
              class='h-9 w-9 p-2 rounded-lg hover:bg-neutral-200/20 active:text-gray-800'
            />
        </NuxtLink>
      </div>
    </div>
  </div>
  </div>
</template>
