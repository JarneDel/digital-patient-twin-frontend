<script setup lang='ts'>

import { GChart } from 'vue-google-charts'
import { GoogleChartOptions } from 'vue-google-charts/dist/types'
import { BloodPressureData } from '~/interfaces/IHistoriek'
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
    type: Array as PropType<BloodPressureData[]>,
    required: true,
  },
})

const chartDataComputed = computed(() => {
  const dataWithLabel: any[] = [
    ['tijd', 'systolic', 'diastolic'],
  ]
  console.log(props.data.length)
  props.data.forEach((item, index) => {
    // item.timestamp: 2023-05-31T13:14:18+02:00
    const date = props.timeStamps[index]
    // convert to chart label
    const label = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
    dataWithLabel.push([
      label,
      item.systolic.avg,
      item.diastolic.avg,
    ])
    console.log(dataWithLabel)
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
  colors: ['#158E87', '#C30707'],

})
</script>

<template>
  <div class='drop-shadow-md m-2 rounded-lg bg-neutral-600'>
    <GChart
      :data="chartDataComputed"
      :options="options"
      type="LineChart"
    />
  </div>
</template>

<style scoped>

</style>