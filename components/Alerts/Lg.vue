<script setup lang='ts'>
import { ArrowUp, LineChart } from 'lucide-vue-next'
import { PropType } from '@vue/runtime-core'
import { AlertType, IMelding } from '~/interfaces/AlertType'
import { SvgAdemfrequentie, SvgBloodpressure, SvgHeartrate, SvgOxygen, SvgTemperature } from '#components'


const props = defineProps({
  type: {
    type: String as PropType<AlertType>,
    required: true,
  },
  alert: {
    type: Object as PropType<IMelding>,
    required: true,
  },
})

function calculateAge(birthDate: string) {
  const birthDateParts = birthDate.split('/')
  const birthDay = parseInt(birthDateParts[0], 10)
  const birthMonth = parseInt(birthDateParts[1], 10) - 1
  const birthYear = parseInt(birthDateParts[2], 10)

  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  let age = currentYear - birthYear

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--
  }

  return age
}


const alertSvg = computed(() => {
  switch (props.alert.type) {
    case  AlertType.BloodPressure:
      return SvgBloodpressure
    case AlertType.temperature:
      return SvgTemperature
    case AlertType.oxygen:
      return SvgOxygen
    case AlertType.heartRate:
      return SvgHeartrate
    case AlertType.breathingRate:
      return SvgAdemfrequentie
  }
})
onMounted(() => {
  console.log(props.alert.type)
})
const unit = computed(() => {
  switch (props.alert.type) {
    case AlertType.BloodPressure:
      return 'mmHg';
    case AlertType.temperature:
      return '°C';
    case AlertType.oxygen:
      return '%';
    case AlertType.heartRate:
      return 'bpm';
    case AlertType.breathingRate:
      return 'rpm';
    default:
      throw new Error(`Unknown alert type: ${props.type}`);
  }

})

</script>

<template>
  <div
    class='mx-5 my-3 grid w-[900px] grid-cols-[12px_120px_250px_150px_150px_150px_48px] grid-rows-1 rounded-lg bg-white p-2 drop-shadow-2xl'
    :class="{
      'border-l-4 border-primary-375': alert.level === 'danger',
      'border-l-4 border-other-200': alert.level === 'warning',
    }"
  >
    <div class='w-[3px]'></div>
    <component
      :is='alertSvg'
      class='h-14 w-14 rounded-md p-2 row-start-1 row-end-3'
      :class="{
        'bg-primary-50 text-primary-500': alert.level === 'danger',
        'bg-orange-50 text-orange-500': alert.level === 'warning',
        'bg-green-50 text-green-500': alert.level === 'good',
       }" />
    <div class='self-center'>
      <div>{{ alert.name }}</div>
      <div class='text-sm text-neutral-100'>16:53</div>
    </div>
    <div class='self-center'>
      <div>{{ alert.dateOfBirth }}</div>
      <div class='text-sm text-neutral-100'>
        {{ calculateAge(alert.dateOfBirth) }} jaar
      </div>
    </div>
    <div class='flex flex-col items-center pr-10'>
      <div>Hartslag</div>
      <div class='flex items-center'>
        <ArrowUp />
        <div class='text-base font-semibold'>{{ alert.value }} {{ unit }}</div>
      </div>
    </div>
    <div class='self-center'>
      <div>actief voor</div>
      <div class='text-sm text-neutral-100'>7 minuten</div>
    </div>
    <div class='self-center'>
      <NuxtLink to='dokter/[dokterid]/patients/[patientid]'>
        <Line-chart />
      </NuxtLink>
    </div>
  </div>
</template>
