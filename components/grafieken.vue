<script setup lang='ts'>

import { IHistoriek } from '~/interfaces/IHistoriek'
import { GChart } from 'vue-google-charts'
import { GoogleChartOptions } from 'vue-google-charts/dist/types'
import {LucideLoader2 } from 'lucide-vue-next'

const props = defineProps({
  for: {
    type: String,
    required: true,
  },
})

// default: yesterday
const start = ref<Date>(new Date(new Date().setDate(new Date().getDate() - 1)))
const end = ref<Date>(new Date())
const range = ref<'day' | 'week' | 'month'>('day')
console.log(props.for)
console.log('fetching')
const { data, error, pending } = useFetch<IHistoriek[]>(`${props.for}`, {
  method: 'GET',
  baseURL: 'http://localhost:5000/history/',
  params: {
    range: range.value,
    start: start.value.getTime() / 1000,
    end: end.value.getTime() / 1000,
  },
  lazy: true,
})


const options = ref<GoogleChartOptions>({
  legend: 'none',
  width: 800,
  height: 600,
  title: "Hartslag",
  hAxis: {
    title: "Tijd [hh:mm]",
  },
  vAxis: {
    title: "Hartslag [bpm]"

  }
})

</script>

<template>
  <div v-if='pending'>
    <lucide-loader2 class='animate-spin'/>
  </div>
  <div v-else-if='error'>error</div>
  <div v-else-if='data !== null'>
    <g-chart :data='chartDataComputed' type='CandlestickChart' :options='options' :resizeDebounce="500" />

  </div>
</template>

<style scoped>

</style>