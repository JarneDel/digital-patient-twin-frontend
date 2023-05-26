<script setup lang="ts">
import { ArrowUp, LineChart } from 'lucide-vue-next'
import Heartrate from '../svg/heartrate.vue'
import Ademfrequentie from '../svg/ademfrequentie.vue'
import bloodpressure from '../svg/bloodpressure.vue'
import temperature from '../svg/temperature.vue'
import oxygen from '../svg/oxygen.vue'
import { PropType } from '@vue/runtime-core'
import { AlertType } from '~/interfaces/AlertType'

defineProps({
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
  birthdate: {
    type: String,
    required: true,
  },
  level: {
    type: String,
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
</script>

<template>
  <div
    class="mx-5 my-3 grid w-[900px] grid-cols-[12px_120px_250px_150px_150px_150px_48px] grid-rows-1 rounded-lg bg-white p-2 drop-shadow-2xl"
    :class="{
      'border-l-4 border-primary-375': level === 'danger',
      'border-l-4 border-other-200': level === 'warning',
    }"
  >
    <div class="w-[3px]"></div>
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
    <div class="self-center">
      <div>{{ name }}</div>
      <div class="text-sm text-neutral-100">16:53</div>
    </div>
    <div class="self-center">
      <div>{{ birthdate }}</div>
      <div class="text-sm text-neutral-100">
        {{ calculateAge(birthdate) }} jaar
      </div>
    </div>
    <div class="flex flex-col items-center pr-10">
      <div>Hartslag</div>
      <div class="flex items-center">
        <ArrowUp />
        <div class="text-base font-semibold">120 bpm</div>
      </div>
    </div>
    <div class="self-center">
      <div>actief voor</div>
      <div class="text-sm text-neutral-100">7 minuten</div>
    </div>
    <div class="self-center">
      <NuxtLink to="dokter/[dokterid]/patients/[patientid]">
        <Line-chart />
      </NuxtLink>
    </div>
  </div>
</template>
