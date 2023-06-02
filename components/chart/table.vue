<script setup lang="ts">
import { timeStamp } from 'console'
import { IHistoriek } from '~/interfaces/IHistoriek'

const url =
  'http://localhost:5012/v1.0/invoke/PatientData/method/history/878c95cf-e82d-40a5-a56c-8790427f1657?range=5'
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

// time, but only hours and minutes
const time = computed(() => {
  const mappedTimestamps = []

  // hours and minutes only
  if (data.value) {
    mappedTimestamps.push(
      ...data.value.map(item =>
        new Date(item.timestamp).toLocaleTimeString('nl-BE', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      ),
    )
  }

  const nextTimestamp = new Date() // Create a new Date object with the current timestamp
  mappedTimestamps.push(
    nextTimestamp.toLocaleTimeString('nl-BE', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  )
  console.log(mappedTimestamps + ' mappedTimestamps')

  return mappedTimestamps.slice(
    mappedTimestamps.length - 6,
    mappedTimestamps.length,
  )
})
</script>

<template>
  <div v-if="pending">Loading... {{ pending }}</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div class="grid grid-cols-[2fr_6fr] w-[1150px] pt-2 bg-primary-50">
    <div></div>
    <div class="flex justify-between px-2">
      <div
        v-if="time"
        :key="Math.random()"
        v-for="timestamp in time"
        class="flex items-center justify-center text-end"
      >
        <div>{{ timestamp }}</div>
      </div>
    </div>
  </div>
  <div
    class="items grid h-[300px] w-[1150px] grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_.1fr] grid-rows-5 bg-neutral-600 drop-shadow-2xl"
  >
    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div class="ml-8">zuurstof</div>
      <svg-oxygen class="w-8" />
    </div>
    <div
      v-if="result"
      :key="Math.random()"
      
      class="self-center"
      v-for="oxygen in result?.map(item => item.bloedzuurstof)"
    >
      <div class="text-center">{{ oxygen.avg.toFixed(1) }}</div>
    </div>
    <div></div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div class="ml-8">hartslag</div>
      <svg-heartrate class="w-8" />
    </div>
    <div
      v-if="result"
      :key="Math.random()"
      class="self-center"
      v-for="hartslag in result?.map(item => item.hartslag)"
    >
      <div class="text-center">{{ hartslag.avg.toFixed(0) }}</div>
    </div>
    <div></div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div class="ml-8">bloeddruk</div>
      <svg-bloodpressure class="w-10" />
    </div>
    <div
      v-if="result"
      :key="Math.random()"
      class="self-center"
      v-for="bloeddruk in result?.map(item => item.bloeddruk)"
    >
      <div class="text-center">
        {{ bloeddruk.systolic.avg.toFixed(0) }} /
        {{ bloeddruk.diastolic.avg.toFixed(0) }}
      </div>
    </div>
    <div></div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div class="ml-8">ademfrequentie</div>
      <svg-ademfrequentie class="w-8" />
    </div>
    <div
      v-if="result"
      :key="Math.random()"
      class="self-center"
      v-for="ademFrequentie in result?.map(item => item.ademFrequentie)"
    >
      <div class="text-center">{{ ademFrequentie.avg.toFixed(0) }}</div>
    </div>
    <div></div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div class="ml-8">temperatuur</div>
      <svg-temperature class="w-8" />
    </div>
    <div
      v-if="result"
      :key="Math.random()"
      class="self-center"
      v-for="temperatuur in result?.map(item => item.temperatuur)"
    >
      <div class="text-center">{{ temperatuur.avg.toFixed(1) }}</div>
    </div>
    <div></div>

  </div>
</template>
