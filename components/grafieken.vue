<script setup lang='ts'>

import { IHistoriek } from '~/interfaces/IHistoriek'
import { GChart } from 'vue-google-charts'
import { GoogleChartOptions } from 'vue-google-charts/dist/types'
import { LucideLoader2 } from 'lucide-vue-next'
import Boxplot from '~/components/grafieken/boxplot.vue'
import { FetchContext } from 'ofetch'

const props = defineProps({
  for: {
    type: String,
    required: true,
  },
})

// default: yesterday
const start = ref<Date>(new Date(new Date().setDate(new Date().getDate() - 1)))
const end = ref<Date>(new Date())
const range = ref<'day' | 'week' | 'month'>('week')
console.log(props.for)
console.log('fetching')
const { data, error, pending } = useFetch<IHistoriek[]>(`${props.for}`, {
  method: 'GET',
  baseURL: 'http://localhost:5000/history/',
  lazy: true,
  immediate: true,
  key: Math.random().toString(),
  onRequest({ options }: FetchContext): Promise<void> | void {
    options.params = {
      range: range.value,
      start: start.value.getTime() / 1000,
      end: end.value.getTime() / 1000,
    }
  },
  watch: [range, start, end],
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
<!--     time picker start -->
  <pressables-selector :options='["day", "week", "month"]' v-model:selected='range' />

  <div v-if='pending' class='flex flex-row flex-wrap '>
    <LoadersWidget width='800px' height='600px' v-for='item of [1,2,3,4,5]' :key='item'></LoadersWidget>
  </div>
  <div v-else-if='error'>error</div>
  <div v-else-if='data !== null' class='flex flex-row flex-wrap '>
    <boxplot :data='data.map(item => item.hartslag)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Hartslag [bpm]' x-label='Tijd [hh:ss]' type='Hartslag'></boxplot>
    <boxplot :data='data.map(item => item.bloedzuurstof)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Zuurstof [%]' x-label='Tijd [hh:ss]' type='bloedzuurstof'></boxplot>
    <boxplot :data='data.map(item => item.ademFrequentie)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Ademfrequentie [rpm]' x-label='Tijd [hh:ss]' type='Ademfrequentie'></boxplot>
    <boxplot :data='data.map(item => item.temperatuur)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Temperatuur [°C]' x-label='Tijd [hh:ss]' type='Temperatuur'></boxplot>
  </div>
</template>

<style scoped></style>