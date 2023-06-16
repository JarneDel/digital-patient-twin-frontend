<script setup lang="ts">
import Pinrotated from '../svg/pinrotated.vue'
import { Pencil, LineChart, LucideX } from 'lucide-vue-next'
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
})
defineEmits(['unpin'])
const hover = ref<boolean>(false)
</script>

<template>
  <NuxtLink
    :to='`/dokter/patienten/${patientId}`'
    class="flex h-[66px] w-[550px] items-center rounded-lg bg-white px-4 drop-shadow-xl transition-all hover:bg-neutral-500"
  >
    <div
      class="grid grid-cols-[1fr_9fr_5fr_4fr_2fr_2fr] grid-rows-1 items-center"
    >
      <button
        class='h-10 w-10 rounded-lg text-gray-700 hover:bg-neutral-300 active:text-gray-800'
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
        class="justify-self-center"
        :to='`/dokter/patienten/${patientId}/edit`'
      >
        <pencil
          class="h-10 w-10 rounded-lg p-2 text-gray-700 hover:bg-neutral-300 active:text-gray-800"
        />
      </NuxtLink>
      <NuxtLink
        class="justify-self-center"
        :to='`/dokter/patienten/${patient.id}`'
      >
        <Line-chart
          class="h-10 w-10 rounded-lg p-2 text-gray-700 hover:bg-neutral-300 active:text-gray-800"
        />
      </NuxtLink>
    </div>
  </NuxtLink>
</template>
