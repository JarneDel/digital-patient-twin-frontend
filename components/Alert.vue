<script setup lang="ts">
import { LucideX } from 'lucide-vue-next'
import { AlertType } from '~/interfaces/AlertType'

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
    type: String,
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

const unit = computed(() => {
  if (props.type === AlertType.BloodPressure) return 'mmHg'
  if (props.type === AlertType.temperature) return '°C'
  if (props.type === AlertType.oxygen) return '%'
  return ''
})


</script>

<template>
  <div class="bg-white p-5">
    <div class="flex justify-between rounded-lg bg-white p-5 drop-shadow-2xl">
      <div class="ml-5 flex flex-row">
        <svg-bloodpressure
          v-if="type === AlertType.BloodPressure"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />
        <svg-temperature
          v-else-if="type === AlertType.temperature"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />
        <svg-oxygen
          v-else-if="type === AlertType.oxygen"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />
        <svg-heartrate
          v-else-if ="type === AlertType.heartRate"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />
        <svg-ademfrequentie
          v-else-if ="type === AlertType.breathingRate"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />

        <div class="ml-5">
          <h1
            class="text-md font-semibold capitalize"
          >
            {{type.toString()}}: {{ value }} {{ unit }}
          </h1>
          <div class="mt-2 flex gap-4">
            <p class="text-sm font-medium text-gray-500">{{ name }}</p>
            <p class="text-sm font-medium text-gray-500">{{ datetime }}</p>
          </div>
        </div>
      </div>
      <LucideX :size="28" class="ml-auto text-gray-500 hover:cursor-pointer" />
    </div>
  </div>
</template>

<style scoped></style>
