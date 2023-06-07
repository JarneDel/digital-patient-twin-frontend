<script setup lang='ts'>
import { GChart } from 'vue-google-charts'
import { GoogleChartOptions } from 'vue-google-charts/dist/types'
import { MeasurementData } from '~/interfaces/IHistoriek'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  xLabel: {
    type: String,
    required: true,
  },
  yLabel: {
    type: String,
    required: true,
  },
  timeStamps: {
    type: Array as PropType<Date[]>,
    required: true,
  },
  data: {
    type: Array as PropType<MeasurementData[]>,
    required: true,
  },
})

const chartDataComputed = computed(() => {
  const dataWithLabel: any[] = [
    ['day', 'min/max Q1/Q3', 'Q1', 'Q3', 'max'],
  ]
  props.data.forEach((item, index) => {
    // item.timestamp: 2023-05-31T13:14:18+02:00
    const date = props.timeStamps[index]
    // convert to chart label
    const label = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    dataWithLabel.push([
      label,
      item.min,
      item.q1,
      item.q3,
      item.max,
    ])
  })
  return dataWithLabel
})


const options = ref<GoogleChartOptions>({
  legend: 'none',
  width: 600,
  height: 400,
  title: props.type,
  hAxis: {
    title: props.xLabel,
  },
  vAxis: {
    title: props.yLabel,
  },
  backgroundColor: 'transparent',
  chartArea: {
    backgroundColor: 'transparent',
  },
  candlestick: {
    fallingColor: {
      strokeWidth: 1,
      fill: '#a52714', // red
    },
    risingColor: {
      strokeWidth: 1,
      fill: '#C42828', // tertiary
    },
  },
  colors: [
    '#E19393', // tertiary
    '#E19393', // tertiary
    '#E19393', // tertiary
    '#E19393', // tertiary
  ],

  

})
</script>

<template>
  <div class='drop-shadow-md m-2 rounded-lg bg-neutral-600'>
    <g-chart :data='chartDataComputed' type='CandlestickChart' :options='options' :resizeDebounce='500' />
  </div>
</template>