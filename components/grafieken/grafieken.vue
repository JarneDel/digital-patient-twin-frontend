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
const range = ref<'dag' | 'week' | 'maand'>('dag')
console.log(props.for)
console.log('fetching')
const rangeEn = computed(() => {
  switch (range.value) {
    case 'dag':
      return 'day'
    case 'week':
      return 'week'
    case 'maand':
      return 'month'
  }
})

const { data, error, pending, execute } = useFetch<IHistoriek[]>(`${props.for}`, {
  method: 'GET',
  baseURL: 'http://localhost:5000/history/',
  lazy: true,
  immediate: true,
  key: Math.random().toString(),
  onRequest({ options }: FetchContext): Promise<void> | void {
    options.params = {
      range: rangeEn.value,
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
watch(error, () => {
  console.log(error.value?.name)
})


</script>
<template>
<!--     time picker start -->
  <pressables-selector :options='["dag", "week", "maand"]' v-model:selected='range' />

  <div v-if='pending' class='flex flex-row flex-wrap '>
    <LoadersWidget width='800px' height='600px' v-for='item of [1,2,3,4,5]' :key='item'></LoadersWidget>
  </div>
  <PopupError v-else-if="error" title-message='Error' :message='error.name + " " + error.statusCode' button2='try again' @button2Event='execute'></PopupError>
  <div v-else-if='data !== null' class='flex flex-row flex-wrap justify-center gap-4 pt-6 '>
    <boxplot :data='data.map(item => item.hartslag)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Hartslag [bpm]' x-label='Tijd [hh:ss]' type='Hartslag'></boxplot>
    <boxplot :data='data.map(item => item.bloedzuurstof)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Zuurstof [%]' x-label='Tijd [hh:ss]' type='Bloedzuurstof'></boxplot>
    <boxplot :data='data.map(item => item.ademFrequentie)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Ademfrequentie [rpm]' x-label='Tijd [hh:ss]' type='Ademfrequentie'></boxplot>
    <boxplot :data='data.map(item => item.temperatuur)' :time-stamps='data.map(item => new Date(item.timestamp))'
      y-label='Temperatuur [°C]' x-label='Tijd [hh:ss]' type='Temperatuur'></boxplot>
    <grafieken-linechart
      :data='data.map(item => item.bloeddruk)'
      :time-stamps='data.map(item => new Date(item.timestamp))'
      x-label='Tijd [hh:ss]'
      y-label='Bloeddruk [mmHg]'
      type='Bloeddruk'
    />
  </div>
</template>

<style scoped></style>