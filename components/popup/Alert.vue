<script setup lang="ts">
import { is } from '@babel/types'
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

const status = computed(() => {
  if (props.level === 'danger') return 'kritisch'
  if (props.level === 'warning') return 'matig'
  if (props.level === 'good') return 'goed'
  return ''
})
</script>

<template>
  <div class="h-full w-auto bg-white p-5" role="alert">
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
          v-else-if="type === AlertType.heartRate"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />
        <svg-ademfrequentie
          v-else-if="type === AlertType.breathingRate"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'danger',
            'bg-orange-50 text-orange-500': level === 'warning',
            'bg-green-50 text-green-500': level === 'good',
          }"
        />

        <div class="ml-5">
          <h1 class="text-md font-semibold capitalize">
            {{ type.toString() }}: {{ value }} {{ unit }}
          </h1>
          <div class="mt-2 flex gap-4">
            <p class="text-sm font-medium text-gray-500">{{ name }}</p>
            <p class="text-sm font-medium text-gray-500">{{ datetime }}</p>
            <p
              class="text-sm font-medium uppercase text-gray-500"
              v-if="level === 'danger'"
              :class="{ 'text-primary-500': level === 'danger' }"
            >
              <span class="text-gray-500">Gezondheid:</span>
              <span class="ml-2 uppercase">{{ status }}</span>
            </p>
            <p
              class="text-sm font-medium uppercase text-gray-500"
              v-else-if="level === 'warning'"
              :class="{ 'text-orange-500': level === 'warning' }"
            >
              <span class="text-gray-500">Gezondheid:</span>
              <span class="ml-2 uppercase">{{ status }}</span>
            </p>
            <p
              class="text-sm font-medium uppercase text-gray-500"
              v-else="level === 'good'"
              :class="{ 'text-green-500': level === 'good' }"
            >
              <span class="text-gray-500">Gezondheid:</span>
              <span class="ml-2 uppercase">{{ status }}</span>
            </p>
          </div>
        </div>
      </div>
      <LucideX :size="28" class="ml-auto text-gray-500 hover:cursor-pointer" />
    </div>
  </div>
</template>

<style scoped></style>
