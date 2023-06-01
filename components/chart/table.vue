<script setup lang="ts">
import { IHistoriek } from '~/interfaces/IHistoriek'

const url = 'http://localhost:5012/v1.0/invoke/PatientData/method/history/878c95cf-e82d-40a5-a56c-8790427f1657?range=10m'
const { error, data, pending } = await useFetch<IHistoriek[]>(url)


const timestamps = computed(() => {
  const mappedTimestamps = [];

  if (data.value) {
    mappedTimestamps.push(...data.value.map((item) => new Date(item.timestamp)));
  }

//   const nextTimestamp = new Date(); // Create a new Date object with the current timestamp
//   mappedTimestamps.push(nextTimestamp); // Add the next timestamp to the array

  console.log(mappedTimestamps + "mappedTimestamps");
  return mappedTimestamps;
})


const bloedzuurstof = computed(() => {
  if (data.value) {
    return data.value.map((item) => item.bloedzuurstof)
  }
})

const hartslag = computed(() => {
  if (data.value) {
    return data.value.map((item) => item.hartslag)
  }
})

const temperatuur = computed(() => {
  if (data.value) {
    return data.value.map((item) => item.temperatuur)
  }
})

const ademFrequentie = computed(() => {
  if (data.value) {
    return data.value.map((item) => item.ademFrequentie)
  }
})

const bloeddruk = computed(() => {
  if (data.value) {
    return data.value.map((item) => item.bloeddruk)
  }
})


</script>

<template>
    <div v-if="pending">Loading... {{ pending }}</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <!-- <div v-else>{{ data }}</div> -->
  <div class="grid h-[300px] w-[1150px] grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] grid-rows-6 bg-neutral-600 pt-2 drop-shadow-2xl">
    <div
      v-for="timestamp of timestamps"
      :key="timestamp.toString()"
      class="-pr-4 flex items-end justify-end bg-primary-50 text-end"
    >
    <div>{{ timestamp.getHours() }} : {{ timestamp.getMinutes() }}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>zuurstof</div>
      <svg-oxygen class="w-8" />
    </div>
    <div v-for="oxygen in bloedzuurstof">
        <div class="text-center">{{ oxygen.avg }}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>hartslag</div>
      <svg-heartrate class="w-8" />
    </div>
    <div v-for="slag in hartslag">
        <div class="text-center">{{ slag.avg }}</div>
    </div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>bloeddruk</div>
      <svg-bloodpressure class="w-10" />
    </div>
    <div class="text-center">{{ bloeddruk[0] }}</div>
    <div class="text-center">{{ bloeddruk[1] }}</div>
    <div class="text-center">{{ bloeddruk[2] }}</div>
    <div class="text-center">{{ bloeddruk[3] }}</div>
    <div class="text-center">{{ bloeddruk[4] }}</div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>ademfrequentie</div>
      <svg-ademfrequentie class="w-8" />
    </div>
    <div class="text-center">{{ ademFrequentie[0] }}</div>
    <div class="text-center">{{ ademFrequentie[1] }}</div>
    <div class="text-center">{{ ademFrequentie[2] }}</div>
    <div class="text-center">{{ ademFrequentie[3] }}</div>
    <div class="text-center">{{ ademFrequentie[4] }}</div>

    <div class="mr-2 flex items-center justify-between bg-neutral-500 pr-4">
      <div>temperatuur</div>
      <svg-temperature class="w-8" />
    </div>
    <div class="text-center">{{ temperatuur[0] }}</div>
    <div class="text-center">{{ temperatuur[1] }}</div>
    <div class="text-center">{{ temperatuur[2] }}</div>
    <div class="text-center">{{ temperatuur[3] }}</div>
    <div class="text-center">{{ temperatuur[4] }}</div>
  </div>

  <!-- <table hartslag="hartslag" bloeddruk="bloeddruk" temperatuur="temperatuur" zuurstof="zuurstof" ademhaling="ademhaling" class="table-auto">
        <thead>
            <tr class="bg-primary-300 h-[52px] relative">
                <th class="px-4 py-2 font-semibold">8:00</th>
                <th class="px-4 py-2 font-semibold">8:20</th>
                <th class="px-4 py-2 font-semibold">8:40</th>
                <th class="px-4 py-2 font-semibold">9:00</th>
                <th class="px-4 py-2 font-semibold">9:20</th>
                <th class="px-4 py-2 font-semibold">9:40</th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">hartslag</div>
                    <div class="w-12 flex justify-center">
                        <svg-heartrate />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px] text-center">{{ hartslag[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ hartslag[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">bloeddruk</div>
                    <div class="w-12 flex justify-center">
                        <svg-bloodpressure />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ bloeddruk[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">zuurstof</div>
                    <div class="w-12 flex justify-center">
                        <svg-oxygen />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ zuurstof[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">ademhaling</div>
                    <div class="w-12 flex justify-center">
                        <svg-ademfrequentie />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ ademhaling[4] }}</td>
            </tr>

            <tr>
                <td class="flex items-center justify-between w-[300px] border border-transparent bg-neutral-500 px-4 py-3">
                    <div class="font-semibold">temperatuur</div>
                    <div class="w-12 flex justify-center">
                        <svg-temperature />
                    </div>
                </td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[0] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[1] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[2] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[3] }}</td>
                <td class="border border-white bg-neutral-600 px-4 py-2 w-[123px]">{{ temperatuur[4] }}</td>
            </tr>

            
        </tbody>
    </table> -->
</template>
