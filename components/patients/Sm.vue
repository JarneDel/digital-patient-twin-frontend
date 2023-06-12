<script setup lang="ts">
import Pinrotated from '../svg/pinrotated.vue'
import { Pencil, LineChart } from 'lucide-vue-next'
import { IPatientAlgemeen } from '~/interfaces/IPatient'

const props = defineProps({
  patient: {
    type: Object as PropType<IPatientAlgemeen>,
    required: true,
  },
})
defineEmits(['unpin'])

const timeDDMMYYYY = computed(() => {
  const date = props.patient.geboorteDatum
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})
</script>

<template>
  <div
    class="flex h-[66px] w-[550px] items-center rounded-lg bg-white px-4 drop-shadow-xl transition-all hover:bg-neutral-500"
  >
    <div
      class="grid grid-cols-[1fr_9fr_5fr_4fr_2fr_2fr] grid-rows-1 items-center"
    >
      <Pinrotated
        role="button"
        class="h-10 w-10 self-center rounded-md text-gray-800 hover:bg-neutral-400"
        @click="$emit('unpin')"
      />
      <span class="pl-4">{{ patient.voornaam }} {{ patient.naam }}</span>
      <span class="text-gray-800">{{ timeDDMMYYYY }}</span>
      <span class="text-gray-800">{{ patient.geslacht }}</span>
      <NuxtLink
        class="justify-self-center"
        to="/dokter/patienten/[patientid]/edit"
      >
        <pencil
          class="h-10 w-10 rounded-lg p-2 text-gray-700 hover:bg-neutral-300 active:text-gray-800"
        />
      </NuxtLink>
      <NuxtLink
        class="justify-self-center"
        to="/dokter/patienten/[patientid]"
      >
        <Line-chart
          class="h-10 w-10 rounded-lg p-2 text-gray-700 hover:bg-neutral-300 active:text-gray-800"
        />
      </NuxtLink>
    </div>
  </div>
</template>
