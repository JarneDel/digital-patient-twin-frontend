<script setup lang="ts">
import { ChevronRight, LucideLineChart } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { ref, onUnmounted, getCurrentInstance } from 'vue'
import { servicesUrls } from '~/servicesurls'

const props = defineProps({
  patient: {
    type: Object as PropType<PatientGegevens>,
    required: true,
  },
  clickEdit: {
    type: Boolean,
    required: true,
  },
  isPinned: {
    type: Boolean,
    required: true,
  },
})

const user = useUser()

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

// patienten met pin

watch(
  () => props.clickEdit,
  state => {
    console.log(state + ' state clickEdit')
    isSelected.value = false
  },
)

const handlePin = (id: string) => {
  console.log('handlepin')
  console.log(id)
  console.log(data.value)
  if (props.patient.id === id) {
    console.log('het is gepind')
  } else {
    console.log('het is niet gepind')
  }
}

const TEST = (id: string) => {
  console.log('TEST')
  // if (props.patient.id === id) {
  //   return 'gepind'
  // } else {
  //   return 'niet gepind'
  // }
}
console.log(props.patient.id + ' => id van patient')
watch(
  () => props.isPinned,
  state => {
    console.log(props.isPinned + ' state isPinned')
  },
)
console.log(props.isPinned + ' => isPinned')
</script>

<template>
  <div>{{ TEST(patient.id) }}</div>
  <div>{{ props.patient.id }} => id van patient</div>
  <div v-for="i of data">{{ i.id }} => alle gepinde patienten</div>
  <div
    class="mx-auto my-3 flex flex-row justify-end rounded-lg bg-neutral-300 p-6"
  >
    <div
      :class="{ 'gap-4': !clickEdit, 'gap-8': clickEdit }"
      class="flex h-auto w-full items-center justify-end font-semibold"
    >
      <div
        class="focus-visible:border-offset-0 rounded-lg border-2 border-transparent focus-visible:border-tertiary-500 focus-visible:outline-none"
        @click="handlePin(patient.id)"
      >
        <svg-pinrotated
          v-if="isPinned"
          class="h-9 w-9 rounded-lg fill-tertiary-500 hover:bg-neutral-200/20 active:text-gray-800"
        />
        <svg-pinrotated
          v-else
          class="h-9 w-9 rounded-lg fill-pink-400 hover:bg-neutral-200/20 active:text-gray-800"
        />
      </div>
      <input
        v-if="clickEdit"
        id="patient-check"
        type="checkbox"
        value=""
        class="form-checkbox form-tertiary-500 h-6 w-6 cursor-pointer rounded border-none accent-tertiary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-500 focus-visible:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
      />
      <div
        v-else
        id="patient-check"
        class="form-checkbox form-tertiary-500 h-6 w-6 cursor-pointer rounded border-none accent-tertiary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-500 focus-visible:ring-offset-0"
      ></div>
      <div class="capitalize">{{ patient.algemeen.voornaam }}</div>
      <div class="capitalize">{{ patient.algemeen.naam }}</div>
      <div>{{ calculateAge(patient.algemeen.geboorteDatum.toString()) }}</div>
      <div class="capitalize">{{ patient.algemeen.geslacht }}</div>

      <div class="flex-1 justify-between">
        <div class="flex items-center justify-end">
          <div class="flex items-center justify-end">
            <NuxtLink
              :to="`/dokter/patienten/${patient.id}`"
              class="focus-visible:border-offset-0 rounded-lg border-2 border-transparent focus-visible:border-tertiary-500 focus-visible:outline-none"
            >
              <LucideLineChart
                class="h-9 w-9 rounded-lg p-2 hover:bg-neutral-200/20 active:text-gray-800"
              />
            </NuxtLink>
          </div>
          <NuxtLink
            :to="`/dokter/patienten/${patient.id}/gegevens`"
            class="focus-visible:border-offset-0 rounded-lg border-2 border-transparent focus-visible:border-tertiary-500 focus-visible:outline-none"
          >
            <ChevronRight
              class="h-9 w-9 rounded-lg p-2 hover:bg-neutral-200/20 active:text-gray-800"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
