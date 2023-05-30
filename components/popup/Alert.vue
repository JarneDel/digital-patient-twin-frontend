<script setup lang='ts'>
import { LucideX } from 'lucide-vue-next'
import { AlertType } from '~/interfaces/AlertType'
import { SvgAdemfrequentie, SvgBloodpressure, SvgHeartrate, SvgOxygen, SvgTemperature } from '#components'

const props = defineProps({
  type: {
    type: String as PropType<AlertType>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
})

defineEmits(['remove', 'details'])

const unit = computed(() => {
  if (props.type === AlertType.BloodPressure) return 'mmHg'
  if (props.type === AlertType.temperature) return '°C'
  if (props.type === AlertType.oxygen) return '%'
  return ''
})
console.log(props.datetime)

const { elapsedTime } = useElapsedTime(props.datetime)


const status = computed(() => {
  switch (props.level) {
    case 'danger':
      return 'kritisch'
    case 'warning':
      return 'matig'
    case 'good':
      return 'goed'
    default:
      return ''
  }
})

const alertSvg = computed(() => {
  switch (props.type) {
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


</script>

<template>
  <div @click='$emit("details")'
       class='rounded-lg bg-white p-5 drop-shadow-2xl gap-x-2 grid grid-rows-2 hover:bg-neutral-50 hover:translate-x-1 transition-all grid-cols-[auto,repeat(3,1fr),auto] items-center'
       role='button'>
    <component
      :is='alertSvg'
      class='h-14 w-14 rounded-md p-2 row-start-1 row-end-3'
      :class="{
        'bg-primary-50 text-primary-500': props.level === 'danger',
        'bg-orange-50 text-orange-500': props.level === 'warning',
        'bg-green-50 text-green-500': props.level === 'good',
       }" />
    <!--    <h3 class='text-md font-semibold capitalize'>{{ type.toString() }}: {{ value }} {{ unit }}</h3>-->
    <h3 class='text-md font-semibold capitalize whitespace-nowrap'>{{ value }} {{ unit }}</h3>
    <p class='text-sm font-medium uppercase text-gray-500 text-right col-span-2'>{{ elapsedTime }}</p>


    <p class='text-sm font-medium text-gray-500 col-span-2'>{{ name }}</p>


    <p
      class='text-sm font-medium uppercase text-gray-500 text-right'
      :class="{ 'text-primary-500': level === 'danger',
                        'text-orange-500': level === 'warning',
                        'text-green-500': level === 'good' }"
    >
      {{ status }}
    </p>
    <LucideX :size='28' @click='$emit("remove")'
             class='col-start-5 row-start-1 row-end-3 text-gray-500 hover:cursor-pointer rounded-lg hover:bg-neutral-300 active:text-gray-800' />


  </div>
</template>

<style scoped>

</style>
