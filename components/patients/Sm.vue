<script setup lang="ts">
import Pinrotated from '../svg/pinrotated.vue'
import { LineChart, LucideX, Pencil } from 'lucide-vue-next'
import { IPatientAlgemeen } from '~/interfaces/IPatient'

const props = defineProps({
  patient: {
    type: Object as PropType<IPatientAlgemeen>,
    required: true,
  },
  patientId: {
    type: Number,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
})
defineEmits(['unpin'])
const hover = ref<boolean>(false)

console.info('patient', props.patientId)
</script>

<template>
  <div
  @click="() => navigateTo(`/dokter/patienten/${patient.id}`)"
    class='rounded-lg h-[66px] flex bg-white px-4 drop-shadow-xl transition-all max-w-[34rem] hover:bg-neutral-500 items-center'
  >
    <div
      class="grid grid-cols-[1fr_9fr_5fr_4fr_2fr_2fr] grid-rows-1 items-center"
    >
      <button
        class='h-10 w-10 rounded-lg text-gray-700 hover:bg-neutral-300 active:text-gray-800 outline-none ring-transparent ring-2 focus:ring-tertiary-500'
        @mouseleave='hover = false'
        @mouseover='hover = true'
        @click.stop="$emit('unpin')"
      >
        <Pinrotated v-if='!hover' class='h-10 w-10' :isRotated="true"/>
        <LucideX v-else class='h-10 w-10 p-2' />
      </button>
      <span class="pl-4">{{ patient.voornaam }} {{ patient.naam }}</span>
      <span class='text-gray-800'>{{ patient.geboorteDatum }}</span>
      <span class="text-gray-800">{{ patient.geslacht }}</span>
      <NuxtLink
        class="justify-self-center rounded-lg outline-none ring-transparent ring-2 focus:ring-tertiary-500"
        :to='!isDisabled? `/dokter/patienten/${patientId}/edit` : undefined'
      >
        <pencil
          class="h-10 w-10 rounded-lg p-2 text-gray-700 hover:bg-neutral-300 active:text-gray-800"
        />
      </NuxtLink>
      <NuxtLink
        class="justify-self-center rounded-lg outline-none ring-transparent ring-2 focus:ring-tertiary-500"
        :to='!isDisabled? `/dokter/patienten/${patientId}` : undefined'
      >
        <Line-chart
          class="h-10 w-10 rounded-lg p-2 text-gray-700 hover:bg-neutral-300 active:text-gray-800"
        />
      </NuxtLink>
    </div>
  </div>
</template>
