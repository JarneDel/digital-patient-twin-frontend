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
  <div class='flex items-center bg-neutral-500 w-[550px] h-[66px] rounded-lg px-4'>
    <div class='grid grid-cols-[1fr_9fr_5fr_4fr_2fr_2fr] grid-rows-1'>
      <Pinrotated class='self-center' @click='$emit("unpin")' />
      <span class='self-center pl-4'>{{ patient.voornaam }} {{ patient.achternaam }}</span>
      <span class='self-center'>{{timeDDMMYYYY}}</span>
      <span class='self-center'>{{ patient.geslacht }}</span>
      <NuxtLink class='self-center' to='/dokter/[dokterid]/patients/[patientid]/edit'>
        <pencil />
      </NuxtLink>
      <NuxtLink class='self-center' to='/dokter/[dokterid]/patients/[patientid]'>
        <Line-chart />
      </NuxtLink>
    </div>
  </div>
</template>