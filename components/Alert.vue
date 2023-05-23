<script setup lang="ts">
import { X } from 'lucide-vue-next'
import bloodpressure from './svg/bloodpressure.vue'
import temperature from './svg/temperature.vue'
import { del } from 'nuxt/dist/app/compat/capi'
defineProps({
  type: {
    type: Object as PropType<
      'bloodpressures' | 'oxygen' | 'temperature' | 'heartbeat'
    >,
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
</script>

<template>
  <div class="bg-white p-5">
    <div class="flex justify-between rounded-lg bg-white p-5 drop-shadow-2xl">
      <div class="ml-5 flex flex-row">
        <bloodpressure
          v-if="type === 'bloodpressures'"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'high',
            'bg-orange-50 text-orange-500': level === 'mild',
            'bg-green-50 text-green-500': level === 'low',
          }"
        />
        <temperature
          v-else-if="type === 'temperature'"
          class="h-14 w-14 rounded-md p-2"
          :class="{
            'bg-primary-50 text-primary-500': level === 'high',
            'bg-orange-50 text-orange-500': level === 'mild',
            'bg-green-50 text-green-500': level === 'low',
          }"
        />

        <div class="ml-5">
          <h1
            class="text-md font-semibold capitalize"
            v-if="type === 'bloodpressures'"
          >
            bloeddruk: {{ value }}mmHg
          </h1>
          <h1
            class="text-md font-semibold capitalize"
            v-else-if="type === 'oxygen'"
          >
            zuurstof: {{ value }}%
          </h1>
          <h1
            class="text-md font-semibold capitalize"
            v-else-if="type === 'temperature'"
          >
            temperatuur: {{ value }}°C
          </h1>
          <h1
            class="text-md font-semibold capitalize"
            v-else="type === 'heartbeat'"
          >
            hartslag: {{ value }}bpm
          </h1>
          <div class="mt-2 flex gap-4">
            <p class="text-sm font-medium text-gray-500">{{ name }}</p>
            <p class="text-sm font-medium text-gray-500">{{ datetime }}</p>
          </div>
        </div>
      </div>
      <X :size="28" class="ml-auto text-gray-500 hover:cursor-pointer" />
    </div>
  </div>
</template>

<style scoped></style>
