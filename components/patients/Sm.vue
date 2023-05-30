<script setup lang='ts'>
import Pinrotated from '../svg/pinrotated.vue'
import { Pencil, LineChart } from 'lucide-vue-next'
import { IPatientAlgemeen } from '~/interfaces/IPatient'

const props = defineProps({
  patient: {
    type: Object as PropType<IPatientAlgemeen>,
    required: true,
  },
})
defineEmits(["unpin"])

const timeDDMMYYYY = computed(() => {
  const date = props.patient.geboortedatum
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})

</script>

<template>
  <div class='flex items-center bg-white drop-shadow-xl hover:bg-neutral-500 transition-all w-[550px] h-[66px] rounded-lg px-4'>
    <div class='grid grid-cols-[1fr_9fr_5fr_4fr_2fr_2fr] grid-rows-1 items-center'>
      <Pinrotated role='button' class='self-center hover:bg-neutral-400 rounded-md text-gray-800 w-10 h-10'  @click='$emit("unpin")' />
      <span class=' pl-4'>{{ patient.voornaam }} {{ patient.achternaam }}</span>
      <span class=' text-gray-800'>{{timeDDMMYYYY}}</span>
      <span class=' text-gray-800'>{{ patient.geslacht }}</span>
      <NuxtLink class='justify-self-center' to='/dokter/[dokterid]/patients/[patientid]/edit'>
        <pencil class='text-gray-700 w-10 p-2 h-10 rounded-lg hover:bg-neutral-300 active:text-gray-800' />
      </NuxtLink>
      <NuxtLink class='justify-self-center' to='/dokter/[dokterid]/patients/[patientid]'>
        <Line-chart class='rounded-lg w-10 p-2 h-10 hover:bg-neutral-300 active:text-gray-800 text-gray-700' />
      </NuxtLink>
    </div>
  </div>
</template>