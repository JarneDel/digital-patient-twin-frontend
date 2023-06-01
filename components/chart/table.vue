<script setup lang="ts">
import { IHistoriek } from '~/interfaces/IHistoriek'

const url = 'http://localhost:5012/v1.0/invoke/PatientData/method/history/878c95cf-e82d-40a5-a56c-8790427f1657?range=5'
const { error, data, pending } = await useFetch<IHistoriek[]>(url)


// const timestamps = computed(() => {
//   const mappedTimestamps = [];

//   if (data.value) {
//     mappedTimestamps.push(...data.value.map((item) => new Date(item.timestamp)));
//   }

//   const nextTimestamp = new Date(); // Create a new Date object with the current timestamp
//   mappedTimestamps.push(nextTimestamp); // Add the next timestamp to the array

//   console.log(mappedTimestamps + "mappedTimestamps");
//   return mappedTimestamps;
// })

const result = computed(() => {
  if (data.value) {
    return data.value.slice(data.value.length - 5, data.value.length)
  }
})

</script>

<template>
    <div v-if="pending">Loading... {{ pending }}</div>
    <div v-else-if="error">Error: {{ error }}</div>
  <div class="grid h-[300px] w-[1150px] grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] grid-rows-6 bg-neutral-600 pt-2 drop-shadow-2xl">
    <div class="-pr-4 flex items-end justify-end bg-primary-50 text-end">
        <div>8:00</div>
    </div>
    <div class="-pr-4 flex items-end justify-end bg-primary-50 text-end">
        <div>8:20</div>
    </div>
    <div class="-pr-4 flex items-end justify-end bg-primary-50 text-end">
        <div>8:40</div>
    </div>
    <div class="-pr-4 flex items-end justify-end bg-primary-50 text-end">
        <div>9:00</div>
    </div>
    <div class="-pr-4 flex items-end justify-end bg-primary-50 text-end">
        <div>9:20</div>
    </div>
    <div class="-pr-4 flex items-end justify-end bg-primary-50 text-end">
        <div>9:40</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>zuurstof</div>
      <svg-oxygen class="w-8" />
    </div>
    <div v-if="result" :key="Math.random()" v-for="oxygen in result?.map((item) => item.bloedzuurstof)">
        <div class="text-center">{{ oxygen.avg }}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>hartslag</div>
      <svg-heartrate class="w-8" />
    </div>
    <div v-if="result" :key="Math.random()" v-for="hartslag in result?.map((item) => item.hartslag)">
        <div class="text-center">{{ hartslag.avg }}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>bloeddruk</div>
      <svg-bloodpressure class="w-10" />
    </div>
    <div v-if="result" :key="Math.random()" v-for="bloeddruk in result?.map((item) => item.bloeddruk)">
        <div class="text-center">{{ bloeddruk.diastolic.avg}} / {{ bloeddruk.systolic.avg}}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>ademfrequentie</div>
      <svg-ademfrequentie class="w-8" />
    </div>
    <div v-if="result" :key="Math.random()" v-for="ademFrequentie in result?.map((item) => item.ademFrequentie)">
        <div class="text-center">{{ ademFrequentie.avg }}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>temperatuur</div>
      <svg-temperature class="w-8" />
    </div>
    <div v-if="result" :key="Math.random()" v-for="temperatuur in result?.map((item) => item.temperatuur)">
        <div class="text-center">{{ temperatuur.avg }}</div>
    </div>
  </div>
</template>
