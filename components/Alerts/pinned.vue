<script setup lang="ts">
import { LucideX } from 'lucide-vue-next'
import { AlertLevel, AlertType } from '~/interfaces/AlertType'
import {
  SvgAdemfrequentie,
  SvgBloodpressure,
  SvgHeartrate,
  SvgOxygen,
  SvgTemperature,
} from '#components'
import { PropType } from '@vue/runtime-core'

const props = defineProps({
  type: {
    type: Number as PropType<AlertType>,
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
    type: Number as PropType<AlertLevel>,
    required: true,
  },
  clickUrl: {
    type: String,
    required: true,
  },
})

defineEmits(['remove', 'details'])

const unit = computed(() => {
  if (props.type === AlertType.Bloeddruk) return 'mmHg'
  if (props.type === AlertType.Temperatuur) return '°C'
  if (props.type === AlertType.Bloedzuurstof) return '%'
  if (props.type === AlertType.Hartslag) return 'bpm'
  if (props.type === AlertType.AdemsFrequentie) return 'rpm'
  return ''
})

const { elapsedTime } = useElapsedTime(new Date(props.datetime))

const status = computed(() => {
  switch (props.level) {
    case AlertLevel.Kritiek:
      return 'kritisch'
    case AlertLevel.Matig:
      return 'matig'
    case AlertLevel.Info:
      return 'goed'
    default:
      return ''
  }
})

const alertSvg = computed(() => {
  switch (props.type) {
    case AlertType.Bloeddruk:
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
</script>

<template>
  <nuxt-link
    :to="clickUrl"
    @click="$emit('details')"
    class="grid grid-cols-[auto,repeat(3,1fr),auto] grid-rows-2 items-center gap-x-2 rounded-lg bg-white p-5 drop-shadow-lg transition-all hover:translate-x-1 hover:bg-neutral-50 outline-none ring-transparent ring-2 focus:ring-tertiary-500"
    role="button"
  >
    
    <component
      :is="alertSvg"
      class='p-4 h-20 w-20 md:h-14 md:w-14 rounded-md md:p-2 row-start-1 row-end-3'
      :class="{
        'bg-primary-50 text-primary-375': props.level === AlertLevel.Kritiek,
        'bg-orange-50 text-other-200': props.level === AlertLevel.Matig,
        'bg-indigo-50 text-indigo-300': props.level === AlertLevel.Info,
      }"
    />
    <h3 class="text-md whitespace-nowrap font-semibold capitalize">
      {{ value }} {{ unit }}
    </h3>
    <p
      class="col-span-2 text-right text-sm font-medium uppercase text-gray-500"
    >
      {{ elapsedTime }}
    </p>

    <p class="col-span-2 text-sm font-medium text-gray-500">{{ name }}</p>

    <p
      class="text-right text-sm font-medium uppercase text-gray-500"
      :class="{
        'text-primary-375': level === AlertLevel.Kritiek,
        'text-other-200': level === AlertLevel.Matig,
        'text-indigo-300': level === AlertLevel.Info,
      }"
    >
      {{ status }}
    </p>
  </nuxt-link>
</template>

<style scoped></style>
