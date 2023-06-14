<script setup lang="ts">
import { ChevronRight, LucideLineChart } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { ref, onUnmounted, getCurrentInstance } from 'vue'

const props = defineProps({
  patient: {
    type: Object as PropType<PatientGegevens>,
    required: true,
  },
  clickEdit: {
    type: Boolean,
    required: true,
  },
})

const isSelected = ref(false)
const instance = getCurrentInstance()

const handleCheckboxChange = () => {
  isSelected.value = !isSelected.value
  console.log(isSelected.value)
  instance?.emit('checkboxSelected', props.patient.id, isSelected.value)
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

watch(
  () => props.clickEdit,
  (state) => {
    console.log(state + ' state clickEdit')
    isSelected.value = false
  }
)


</script>

<template>
  <div class="mx-auto flex flex-row justify-end my-3 rounded-lg bg-neutral-300 p-6">
    <div
      class="h-auto w-full flex justify-end items-center gap-10 font-semibold transition-all duration-300 ease-linear"
      :class="{ 'max-w-full': !clickEdit, 'max-w-[96%]': clickEdit }"
    >
      <input
        id="patient-check"
        type="checkbox"
        value=""
        class="form-checkbox cursor-pointer form-tertiary-500 h-6 w-6 rounded border-none accent-tertiary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-500 focus-visible:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
      />
      <div class="capitalize">{{ patient.algemeen.voornaam }}</div>
      <div class="capitalize">{{ patient.algemeen.naam }}</div>
      <div>{{ calculateAge(patient.algemeen.geboorteDatum.toString()) }}</div>
      <div class="capitalize">{{ patient.algemeen.geslacht }}</div>
      <!-- <label for="patient-check" class="capitalize">{{
        patient.algemeen.voornaam
      }}</label>
      <label for="patient-check" class="capitalize">{{
        patient.algemeen.voornaam
      }}</label>
      <label for="patient-check" class="capitalize">{{
        patient.algemeen.naam
      }}</label>
      <label for="patient-check" v-for="naam in result">{{
        calculateAge(naam.geboorteDatum.toString()) + ' jaar'
      }}</label>
      <label for="patient-check" class="capitalize">{{
        patient.algemeen.geslacht
      }}</div>
      <div class="flex-1 justify-between">
        <div class="flex items-center justify-end">
          <div class="flex items-center justify-end">
            <NuxtLink :to="`/dokter/patienten/${patient.id}`" class="border-transparent rounded-lg border-2 focus-visible:outline-none focus-visible:border-tertiary-500 focus-visible:border-offset-0">
              <LucideLineChart
                class="h-9 w-9 rounded-lg p-2 hover:bg-neutral-200/20 active:text-gray-800"
              />
            </NuxtLink>
          </div>
          <NuxtLink :to="`/dokter/patienten/${patient.id}/gegevens`" class="border-transparent rounded-lg border-2 focus-visible:outline-none focus-visible:border-tertiary-500 focus-visible:border-offset-0">
            <ChevronRight
              class="h-9 w-9 rounded-lg p-2 hover:bg-neutral-200/20 active:text-gray-800"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style scoped></style>

<!-- klaarzetten voor dynamisch -->
