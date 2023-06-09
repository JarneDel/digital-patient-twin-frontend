<script setup lang="ts">
import { ChevronRight, LucideLineChart } from 'lucide-vue-next'
import { IPatientAlgemeen, PatientGegevens } from '~/interfaces/IPatient'
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

const result = computed<IPatientAlgemeen[]>(() => {
  const lijst: IPatientAlgemeen[] = []
  if (data.value?.algemeen) {
    lijst.push(data.value.algemeen)
  }

  return lijst
})
</script>

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

      <label
        for="patient-check"
        class="capitalize"
        v-if="result"
        :key="Math.random()"
        v-for="naam in result"
        >{{ naam.voornaam }}</label
      >
      <label for="patient-check" class="capitalize" v-for="naam in result">{{
        naam.naam
      }}</label>
      <label for="patient-check" v-for="naam in result">{{
        calculateAge(naam.geboorteDatum.toString())
      }}</label>
      <label for="patient-check" class="capitalize" v-for="naam in result">{{
        naam.geslacht
      }}</label>
      <div class="flex-1 justify-between">
        <div class="flex items-center justify-end">
          <div class="flex items-center justify-end">
            <NuxtLink to="/">
              <LucideLineChart
                class="h-6 w-6 transition-all duration-300 hover:scale-125 hover:cursor-pointer hover:text-secondary-500"
              />
            </NuxtLink>
          </div>
          <NuxtLink to="/dokter/patients/[patientid]/gegevens">
            <ChevronRight
              class="h-6 w-6 transition-all duration-300 hover:scale-125 hover:cursor-pointer hover:text-secondary-500"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
