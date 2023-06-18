<script setup lang="ts">
import { ChevronRight, LucideLineChart } from 'lucide-vue-next'
import { PatientGegevens } from '~/interfaces/IPatient'
import { getCurrentInstance, onUnmounted, ref } from 'vue'
import { servicesUrls } from '~/servicesurls'
import { $fetch, FetchError } from 'ofetch'

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

const handlePin = (id: string, isPinned: boolean) => {
  console.log('handlepin')
  pinPatient(id, isPinned)
  if (props.patient.id === id) {
    console.log('het is gepind')
  } else {
    console.log('het is niet gepind')
  }
}

const pinPatient = (id: string, isPinned: boolean) => {
  if (isPinned) {
    console.log('😀')
    $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
      method: 'DELETE',
      baseURL: servicesUrls.dokterService,
    }).then(
      () => {
        console.log('PIN REMOVED')
      },
      (err: FetchError) => {
        console.log(err)
      },
    )
  } else {
    console.log('😛')
    $fetch(`/dokter/${user.value?.localAccountId}/patient/${id}/pin`, {
      method: 'POST',
      baseURL: servicesUrls.dokterService,
    }).then(
      () => {
        console.log('PIN ADDED')
      },
      (err: FetchError) => {
        console.log(err)
      },
    )
  }
}
console.log(props.patient.algemeen.geboorteDatum, props.patient.algemeen.naam)
defineEmits(['clickPin'])
const {convertDateStringToAge}  = UseDateConverter()
</script>

<template>
  <div
    class="flex flex-row h-[80px] my-4 mx-4 justify-end drop-shadow-xl bg-white rounded-lg px-4 py-4"
  >
    <div
      :class="{ 'gap-4': !clickEdit, 'gap-8': clickEdit }"
      class="flex h-auto w-full items-center justify-end"
    >
      <button
        class="focus-visible:border-offset-0 rounded-lg border-2 border-transparent hover:bg-neutral-200/20 focus-visible:border-tertiary-500 focus-visible:outline-none active:text-gray-800"
        @click="[handlePin(patient.id, isPinned), $emit('clickPin')]"
      >
        <svg-pinrotated
          v-if="!isPinned"
          :isRotated="false"
          class="h-9 w-9 rounded-lg fill-neutral-200"
        />
        <svg-pinrotated
          v-else
          :isRotated="true"
          class="h-9 w-9 rounded-lg fill-primary-400"
        />
      </button>
      <input
        v-if="clickEdit"
        id="patient-check"
        type="checkbox"
        value=""
        class="form-tertiary-500 h-6 w-6 cursor-pointer rounded border-none accent-tertiary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-500 focus-visible:ring-offset-0"
        :checked="isSelected"
        @change="handleCheckboxChange"
      />
      <div
        v-else
        id="patient-check"
        class="form-tertiary-500 h-6 w-6 cursor-pointer rounded border-none accent-tertiary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-500 focus-visible:ring-offset-0"
      ></div>
      <div class="capitalize">{{ patient.algemeen.voornaam }}</div>
      <div class="capitalize">{{ patient.algemeen.naam }}</div>
      <div>{{ convertDateStringToAge(patient.algemeen.geboorteDatum) }}</div>
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
