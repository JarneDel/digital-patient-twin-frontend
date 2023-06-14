<script setup lang='ts'>
import {  LineChart } from 'lucide-vue-next'
import { PropType } from '@vue/runtime-core'
import { AlertLevel, AlertType, IMelding } from '~/interfaces/AlertType'
import { SvgAdemfrequentie, SvgBloodpressure, SvgHeartrate, SvgOxygen, SvgTemperature } from '#components'


const props = defineProps({
  type: {
    type: Number as PropType<AlertType>,
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
    case  AlertType.Bloeddruk:
      return SvgBloodpressure
    case AlertType.Temperatuur:
      return SvgTemperature
    case AlertType.Bloedzuurstof:
      return SvgOxygen
    case AlertType.Hartslag:
      return SvgHeartrate
    case AlertType.AdemsFrequentie:
      return SvgAdemfrequentie
  }
})

const unit = computed(() => {
  switch (props.alert.type) {
    case AlertType.Bloeddruk:
      return 'mmHg'
    case AlertType.Temperatuur:
      return '°C'
    case AlertType.Bloedzuurstof:
      return '%'
    case AlertType.Hartslag:
      return 'bpm'
    case AlertType.AdemsFrequentie:
      return 'rpm'
    default:
      throw new Error(`Unknown alert type: ${props.type}`)
  }
})
const timeDate = computed(() => {
  return new Date(props.alert.timestamp)
})

const time = useFormatDate(timeDate)
const timeAgo = useElapsedTime(new Date(props.alert?.timestamp))

</script>

<template>
  <div
    class='mx-5 my-4  flex md:flex-row flex-row justify-between max-w-[55rem] flex-grow-0  rounded-lg bg-white p-2 drop-shadow-md '
    :class="{
      'border-l-4 border-primary-375': alert.level === AlertLevel.Kritiek,
      'border-l-4 border-other-200': alert.level === AlertLevel.Matig,
      'border-l-4 border-indigo-300': alert.level === AlertLevel.Info,
    }"
  >
    <div class='flex flex-row gap-6'>
      <component
        :is='alertSvg'
        class='p-4 h-20 w-20 md:h-14 md:w-14 rounded-md md:p-2 row-start-1 row-end-3'
        :class="{
        'bg-primary-50 text-primary-500': alert.level === AlertLevel.Kritiek,
        'bg-orange-50 text-orange-500': alert.level === AlertLevel.Matig,
        'bg-indigo-50 text-indigo-500': alert.level === AlertLevel.Info,
       }" />
      <div class='self-center'>
        <div>{{ alert.fullName }}</div>
        <div class='text-sm text-neutral-100'>{{ time }} - <span class='font-fix'>{{ timeAgo.elapsedTime.value }}</span></div>
      </div>
      <div class='self-center'>
        <div>{{ alert.birthDate }}</div>
        <div class='text-sm text-neutral-100'>
          {{ calculateAge(alert.birthDate) }} jaar
        </div>
      </div>

    </div>

    <div class='md:justify-center md:items-center justify-between flex flex-row pr-4'>
      <div class='flex flex-col justify-center items-start w-44 pr-10'>
        <div>{{ AlertType[alert.type] }}</div>
        <div class='text-sm'>{{ alert.value }} {{ unit }}</div>
      </div>
      <NuxtLink :to='`/dokter/patienten/${alert.patientId}`'>
        <Line-chart />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

.font-fix {
  font-variant-numeric: tabular-nums;
  font-family: 'sans-serif';
}

</style>
